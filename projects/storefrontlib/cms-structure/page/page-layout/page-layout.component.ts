import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  public switchUIDebugOn: boolean = false;
  @Input() set section(value: string) {
    console.log("Jerry PageLayoutComponent is assigned section: ", value);
    this.section$.next(value);
  }
  // readonly section$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  readonly section$: BehaviorSubject<string> = new BehaviorSubject('');

  readonly templateName$: Observable<string> =
    this.pageLayoutService.templateName$;

  readonly layoutName$: Observable<string> = this.section$.pipe(
    switchMap((section) => (section ? of(section) : this.templateName$))
  );

  readonly slots$: Observable<string[]> = this.section$.pipe(
    switchMap((section) => this.pageLayoutService.getSlots(section))
  );

  readonly pageFoldSlot$: Observable<string> = this.templateName$.pipe(
    switchMap((templateName) =>
      this.pageLayoutService.getPageFoldSlot(templateName)
    ),
    distinctUntilChanged()
  );

  constructor(protected pageLayoutService: PageLayoutService) {
    console.log('Jerry a new PageLayoutComponent is created!', this);
  }
}
