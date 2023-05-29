import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from "@angular/router";
import {Observable, map, take} from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PreventLoggedInAccessGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(take(1),map(user => {
      // If the user is authenticated, redirect them to the home page
      if (user) {
        if (user.roles.includes('Admin')) {
          return this.router.createUrlTree(['/courses']);
        } else if (user.roles.includes('Instructor')) {
          return this.router.createUrlTree(['/instructor-courses/' + user?.instructor?.instructorId]);
        } else if (user.roles.includes('Student')) {
          return this.router.createUrlTree(['/student-courses/' + user?.student?.studentId]);
        }
      }

      // If the user is not authenticated, allow them to proceed to /auth
      return true;
    }));
  }
}
