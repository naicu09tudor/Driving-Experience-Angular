import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../services/courses.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../model/page.response.model";
import {Course} from "../../model/course.model";
import {InstructorsService} from "../../services/instructors.service";
import {Instructor} from "../../model/instructor.model";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  searchFormGroup!: FormGroup;
  courseFormGroup!: FormGroup;
  updateCourseFormGroup!: FormGroup;
  pageCourses$!: Observable<PageResponse<Course>>;
  instructors$!: Observable<Array<Instructor>>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;
  errorInstructorsMessage!: string;
  defaultInstructor!: Instructor;
  submitted: boolean = false;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private courseService: CoursesService, private instructorService: InstructorsService) {
  }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    this.courseFormGroup = this.fb.group({
      courseName: ["", Validators.required],
      courseDifficulty: ["", Validators.required],
      courseDescription: ["", Validators.required],
      instructor: [null, Validators.required]
    })
    this.handleSearchCourses()
  }


  getModal(content: any) {
    this.fetchInstructors();
    this.modalService.open(content, {size: 'xl'})
    console.log("Hello world")
  }


  handleSearchCourses() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pageCourses$ = this.courseService.searchCourses(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchCourses();
  }

  handleDeleteCourse(c: Course) {
    let conf = confirm("Are you sure?")
    if (!conf) return;
    this.courseService.deleteCourse(c.courseId).subscribe({
      next: () => {
        this.handleSearchCourses();
      },
      error: err => {
        alert(err.message)
        console.log(err)
      }
    })

  }

  getUpdateModel(c: Course, updateContent: any) {
    this.fetchInstructors();
    this.updateCourseFormGroup = this.fb.group({
      courseId: [c.courseId, Validators.required],
      courseName: [c.courseName, Validators.required],
      courseDifficulty: [c.courseDifficulty, Validators.required],
      courseDescription: [c.courseDescription, Validators.required],
      instructor: [c.instructor, Validators.required],
    })
    this.defaultInstructor = this.updateCourseFormGroup.controls['instructor'].value;
    this.modalService.open(updateContent, {size: 'xl'})

  }

  onCloseModal(modal: any) {
    modal.close();
    this.courseFormGroup.reset();
  }

  onSaveCourse(modal: any) {
    this.submitted = true;
    console.log(this.courseFormGroup)
    if (this.courseFormGroup.invalid) return;
    this.courseService.saveCourse(this.courseFormGroup.value).subscribe({
      next: () => {
        alert("Success Saving Driving Course");
        this.handleSearchCourses();
        this.courseFormGroup.reset();
        this.submitted = false;
        modal.close()
      }, error: err => {
        alert(err.message);
      }
    })
  }

  private fetchInstructors() {
    this.instructors$ = this.instructorService.findAllInstructors().pipe(
      catchError(err => {
        this.errorInstructorsMessage = err.message;
        return throwError(err);
      })
    )
  }

  onUpdateCourse(updateModal: any) {
    this.submitted = true;
    if (this.updateCourseFormGroup.invalid) return;
    this.courseService.updateCourse(this.updateCourseFormGroup.value, this.updateCourseFormGroup.value.courseId).subscribe({
      next: () => {
        alert("Success Updating Driving Course");
        this.handleSearchCourses();
        this.submitted = false;
        updateModal.close();
      }, error: err => {
        alert(err.message)
      }
    })

  }
}
