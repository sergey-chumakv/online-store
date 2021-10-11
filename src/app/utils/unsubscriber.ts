import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UnSubscriber implements OnDestroy {
  public unSubscriber$ = new Subject();

  public ngOnDestroy(): void {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}
