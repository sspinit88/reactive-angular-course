import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/operators';

import { Course } from '../model/course';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  loadAllCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>('/api/courses')
      .pipe(
        map(res => {
          return res['payload'];
        }),
        /*TODO Магия sharing-операторов и их разница в RXJS
       https://buhtatyalexander90.medium.com/%D0%BC%D0%B0%D0%B3%D0%B8%D1%8F-sharing-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BE%D0%B2-%D0%B8-%D0%B8%D1%85-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%B2-rxjs-faed2c866c29
        *  */
        shareReplay(),
      );
  }

  saveCourse(id: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${id}`, changes);
  }
}
