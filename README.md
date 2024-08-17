# Driving Experience

## Driving Experience Dashboard

The "Driving Experience" web application provides users with an intuitive interface to enroll in driving courses offered by the academy. The application supports multiple roles with the following features:

- **For Students:** Enrollment in courses proposed by instructors.
- **For Instructors:** Creation of new driving courses.
- **For Admins:** Administration and management of the application.

## Technical Architecture

The application is built using a multi-layered architecture:

- **Core:** Developed with Java 17, Spring Framework, and Spring Boot.
- **Model Layer:** Utilizes Spring Data JPA for data persistence.
- **Business Layer:** Implements business logic using Spring REST services.
- **Front-End Layer:** Built with Angular 14.
- **Security:** Secured with Spring Security and JWT (JSON Web Token).
- **Database:** Uses MySQL for relational data management.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
