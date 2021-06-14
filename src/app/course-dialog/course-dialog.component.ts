import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { CoursesService } from '../services/courses.service';

import { Course } from '../model/course';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent {

  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private coursesService: CoursesService,
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

    this.coursesService
      .saveCourse(this.course.id, changes)
      .subscribe(res => {
        this.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

}
