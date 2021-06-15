import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { LoadingService } from '../loading/loading.service';
import { CoursesService } from '../services/courses.service';
import { MessagesService } from '../messages/messages.service';

import { Course } from '../model/course';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ],
})
export class CourseDialogComponent {

  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;
    this.createForm(this.course);
  }

  createForm(course: Course): void {
    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  save() {
    const changes = this.form.value;

    // todo старый вариант
    // this.loadingService.loadingOn();
    // this.coursesService
    //   .saveCourse(this.course.id, changes)
    //   .subscribe(res => {
    //     this.close();
    //     this.loadingService.loadingOff();
    //   });

    const save$ = this.coursesService
      .saveCourse(this.course.id, changes)
      .pipe(
        catchError(err => {
          const message = 'Could not save course';
          this.messagesService.showErrors(message);
          return throwError(err);
        })
      );

    this.loadingService
      .showLoaderUntilCompleted(save$)
      .subscribe(res => {
        this.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

}
