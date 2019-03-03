import { ApplicationRef, Injectable, OnDestroy } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { concat, interval, NEVER, Observable, Subject } from "rxjs";
import { first, map, takeUntil, tap } from "rxjs/operators";

import { Logger } from "../shared/logger.service";

@Injectable()
export class SwUpdatesService implements OnDestroy {
  private checkInterval = 1000 * 60 * 60 * 6; // 6 hours
  private onDestroy = new Subject<void>();
  updateActivated: Observable<string>;

  constructor(
    appRef: ApplicationRef,
    private logger: Logger,
    private swu: SwUpdate
  ) {
    if (!swu.isEnabled) {
      this.updateActivated = NEVER.pipe(takeUntil(this.onDestroy));
      return;
    }

    const appIsStable = appRef.isStable.pipe(first(v => v));
    concat(appIsStable, interval(this.checkInterval))
      .pipe(
        tap(() => this.log("Checking for update...")),
        takeUntil(this.onDestroy)
      )
      .subscribe(() => this.swu.checkForUpdate());

    this.swu.available
      .pipe(
        tap(evt => this.log(`Update available: ${JSON.stringify(evt)}`)),
        takeUntil(this.onDestroy)
      )
      .subscribe(() => this.swu.activateUpdate());

    this.updateActivated = this.swu.activated.pipe(
      tap(evt => this.log(`Update activated: ${JSON.stringify(evt)}`)),
      map(evt => evt.current.hash),
      takeUntil(this.onDestroy)
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private log(message: string) {
    const timestamp = new Date().toISOString();
    this.logger.log(`[SwUpdates - ${timestamp}]: ${message}`);
  }
}
