import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  constructor(
    private loadingService: LoadingService,
  ) {
  }

  isLoading(): Observable<boolean> {
    return this.loadingService.isLoading();
  }

}
