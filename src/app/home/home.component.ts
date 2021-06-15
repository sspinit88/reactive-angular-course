import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';

import { Course, sortCoursesBySeqNo } from '../model/course';

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
    private loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses(): void {

    // this.loadingService.loadingOn();

    const course$ = this.coursesService
      .loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        // finalize(() => this.loadingService.loadingOff()),
      );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted<Course[]>(course$);

    // this.beginnerCourses$ = course$
    this.beginnerCourses$ = loadCourses$

      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER')),
      );

    // this.advancedCourses$ = course$;
    this.advancedCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED')),
      );
  }

}
