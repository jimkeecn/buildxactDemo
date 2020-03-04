import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";

import { AppComponent } from "./app.component";
import { createCustomElement } from "@angular/elements";
import { SharedModule } from "projects/library/src/shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule],
  providers: [],
  //bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const AppWebComponent = createCustomElement(AppComponent, { injector });
    customElements.define("subject-table-view", AppWebComponent);
    /**can add more web component here......
     *
     * exmaple:
     * const secondComponent = create.......(){}
     * customElements.define("second-component",secondComponent)
     */
  }
  ngDoBootstrap() {}
}
