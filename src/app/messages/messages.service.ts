import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {

  private subject$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.subject$
    .asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0)
    );

  constructor() {
  }

  showErrors(...errors: string[]): void {
    this.subject$.next(errors);
  }

  getErrors(): Observable<string[]> {
    return this.errors$;
  }
}
