import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private _dataSource: any[] = [];
  get dataSource() {
    return this._dataSource;
  }
  @Input()
  set dataSource(val: any[]) {
    console.log(val, new Date());
    this._dataSource = val;
  }
}
