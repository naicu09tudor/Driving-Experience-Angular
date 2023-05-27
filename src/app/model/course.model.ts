import {Instructor} from "./instructor.model";

export interface Course{
  courseId:number;
  courseName:string;
  courseDifficulty: string;
  courseDescription: string;
  instructor: Instructor;
}
