import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
  implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
  ) {
  }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses(): void {
    const course$ = this.coursesService
      .loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
      );

    this.beginnerCourses$ = course$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER')),
      );

    this.advancedCourses$ = course$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED')),
      );
  }


}




