import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
  public alert$ = new Subject<any>()
  public delay = 2000

  success(text: string) {
    this.alert$.next({type: 'success', text})
  }

  error(text: string) {
    this.alert$.next({type: 'error', text})
  }
}
