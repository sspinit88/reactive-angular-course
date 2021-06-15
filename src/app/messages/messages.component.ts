import { Component, OnInit } from '@angular/core';

import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent
  implements OnInit {

  showMessages = false;
  errors$: Observable<string[]>;

  constructor(
    private messagesService: MessagesService,
  ) {
    // console.log('Created messages component');
  }

  ngOnInit(): void {
    this.writeErrors();
  }

  onClose(): void {
    this.showMessages = false;
  }

  writeErrors(): void {
    this.errors$ = this.messagesService
      .getErrors()
      .pipe(
        tap(() => {
          this.showMessages = true;
        })
      );
  }

}
