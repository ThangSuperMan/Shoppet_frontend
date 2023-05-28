import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private reloadSubject: Subject<void> = new Subject<void>();
  reload$: Observable<void> = this.reloadSubject.asObservable();

  triggerReloadNavbarComponent(): void {
    console.log('triggerReloadComponent');
    this.reloadSubject.next();
  }
}
