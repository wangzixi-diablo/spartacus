import { Component, OnInit, OnChanges, Input, ElementRef, SimpleChange } from "@angular/core";

@Component({
    selector: 'fr-form',
    template: ''
  })
  export class FrFormComponent implements OnInit, OnChanges {
    @Input() app: string = "";
    @Input() form: string = "";
    @Input() orbeonContext: string = "";

    private viewReady: boolean = false;

    constructor(
      private element: ElementRef
    ) {}

    private loadBaseline(onLoaded: () => void): void {
      const baselineUrl = this.orbeonContext + "/xforms-server/baseline.js?updates=fr";
      const alreadyLoaded = Array.from(document.scripts).some(script => script.src.endsWith(baselineUrl));
      if (alreadyLoaded) {
        onLoaded();
      } else {
        const scriptElement: HTMLScriptElement = document.createElement("script");
        scriptElement.src = baselineUrl;
        scriptElement.onload = onLoaded;
        document.head.appendChild(scriptElement);
      }
    }
    private loadForm(): void {
      this.element.nativeElement.classList.add("orbeon");
      this.loadBaseline(() => {
        (window as any).ORBEON.fr.API.embedForm(
          this.element.nativeElement,
          "/orbeon",
          this.app,
          this.form,
          "new"
        );
      });
    }
    ngOnInit(): void {
      this.loadForm();
      this.viewReady = true;
    }
    ngOnChanges(_changes: {[propKey: string]: SimpleChange}): void {
      if (this.viewReady)
        this.loadForm();
    }
  }
