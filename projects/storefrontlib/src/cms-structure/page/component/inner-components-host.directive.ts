import {
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { CmsComponent, DynamicAttributeService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CmsComponentData } from '../model/cms-component-data';
import { CmsComponentsService } from '../../services/cms-components.service';
import { ComponentHandlerService } from './services/component-handler.service';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@Directive({
  selector: '[cxInnerComponentsHost]',
})
export class InnerComponentsHostDirective implements OnInit, OnDestroy {
  innerComponents$ = this.data.data$.pipe(
    map((data) => data?.composition?.inner ?? [])
  );

  sub?: Subscription;

  constructor(
    protected data: CmsComponentData<CmsComponent>,
    protected vcr: ViewContainerRef,

    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService,
    protected cmsInjector: CmsInjectorService
  ) {}

  protected componentWrappers: any[] = [];

  ngOnInit(): void {
    this.innerComponents$.subscribe((x) => {
      this.renderComponents(x);
    });
  }

  ngOnDestroy(): void {
    this.componentWrappers.forEach((wrapper) => wrapper.ngOnDestroy());
    this.sub?.unsubscribe();
  }

  protected renderComponents(components: string[]) {
    components.forEach((component) => this.renderComponent(component));
  }

  protected renderComponent(component: string) {
    const componentWrapper = new ComponentWrapperDirective(
      this.vcr,
      this.cmsComponentsService,
      this.injector,
      this.dynamicAttributeService,
      this.renderer,
      this.componentHandler,
      this.cmsInjector
    );
    componentWrapper.cxComponentWrapper = { flexType: component, uid: '' };
    componentWrapper.ngOnInit();
    this.componentWrappers.push(componentWrapper);
  }
}