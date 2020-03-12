import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectorRef
} from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  // @Input() invokeCdChange: any;

  // invoke() {
  //   this.cd.detectChanges();
  //   this.cd.markForCheck();
  // }
  constructor(public http: HttpClient, public cd: ChangeDetectorRef) {
    // this.http
    //   .get("http://dummy.restapiexample.com/api/v1/employees")
    //   .subscribe((res: any) => {
    //     this.dataSource = res.data;
    //   });
  }
}
