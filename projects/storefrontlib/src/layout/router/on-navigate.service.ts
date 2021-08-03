import { ViewportScroller } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { OnNavigateConfig } from './config';

/**
 * Shared service for keyboard focus features called when the browser navigates.
 */
@Injectable({
  providedIn: 'root',
})
export class OnNavigateService implements OnDestroy {
  protected resetViewOnNavigateSubscription: Subscription;

  constructor(
    protected config: OnNavigateConfig,
    protected router: Router,
    protected viewportScroller: ViewportScroller
  ) {}

  /**
   * Reads configuration and enables features based on flags set.
   */
  initializeWithConfig(): void {
    if (this.config?.enableResetViewOnNavigate?.active) {
      this.setResetViewOnNavigateSubscription(
        this.config?.enableResetViewOnNavigate.active
      );
    }
  }

  /**
   * Resets view back to body element in the DOM tree when a navigation is started.
   * @param enable Enable or disable this feature. Set this to an array of BREAKPOINTS to enable for specified screen widths.
   */
  setResetViewOnNavigateSubscription(enable: boolean): void {
    this.resetViewOnNavigateSubscription?.unsubscribe();

    /**
     * This entire service may be dropped and this is just a draft
     *
     * Won't be included to 4.0 anymore, but is an improvement to current behavior
     * focus and navigation should go hand to hand too
     */

    if (enable) {
      this.resetViewOnNavigateSubscription = this.router.events
        .pipe(
          filter((event): event is Scroll => event instanceof Scroll),
          pairwise()
        )
        .subscribe((event: Scroll[]) => {
          /**
           * The previous url is accessible through event[0], however, it is not used as we want to keep the behavior the same as before.
           *
           */

          const previous = event[0];
          const current = event[1];

          console.log('ccurr', current);

          console.log('prev', previous);

          if (current.position) {
            /**
             * if data is loaded, scroll into view
             * may need to build new events, tokens, etc
             * need to make it configurable
             *
             **/

            this.viewportScroller.scrollToPosition(current.position);
          } else {
            /*
             * if pre.afterRedirectUrl.splt('?')[0] ! == curr.afterRedirectionUrl.split('?')[0]
             * || if route.include(routes)
             * || if etc
             *
             * exclude paths / query param / etc to not go on top
             * need to make it configurable
             **/

            this.viewportScroller.scrollToPosition([0, 0]);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.resetViewOnNavigateSubscription?.unsubscribe();
  }
}
