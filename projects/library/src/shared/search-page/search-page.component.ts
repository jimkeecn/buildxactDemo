import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef
} from "@angular/core";
import { SubSink } from "subsink";
import { BehaviorSubject } from "rxjs";
import { FakeData } from "./../../../../main/src/services/app.service";

import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";

@Component({
  selector: "lib-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private paginator: MatPaginator;

  exampleValue: boolean = false;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  private sink = new SubSink(); //prevent memory leak....

  dataSource: MatTableDataSource<FakeData>;

  isLoaded$ = new BehaviorSubject<boolean>(false);

  private _data: FakeData[] = [];

  get data() {
    return this._data;
  }
  @Input()
  set data(val: FakeData[]) {
    if (val && val.length > 0) {
      this._data = val;
      this.updateTableData(val);
      this.isLoaded$.next(true);
      this.cd.detectChanges();
      this.cd.markForCheck();
    }
  }

  updateTableData(val: FakeData[]) {
    this.dataSource.data = val;
    this.dataSource.paginator = this.paginator;
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  clickChange() {
    this.exampleValue = !this.exampleValue;
  }
  searchTerm = new FormControl("");

  get invokeCdChange() {
    return "";
  }
  @Input()
  set invokeCdChange(val: any) {
    console.log("cd invoked", val);
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  constructor(public cd: ChangeDetectorRef) {}

  displayedColumns: string[] = ["employee_name", "date"];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.sink.add(
      this.searchTerm.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(res => {
          this.dataSource.filter = res.trim().toLowerCase();
        })
    );
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cd.detectChanges();
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
