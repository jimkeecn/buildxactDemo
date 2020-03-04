import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  Input,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { SubSink } from "subsink";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { FakeData } from "./../../../../main/src/services/app.service";

import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormGroup, FormControl } from "@angular/forms";

const ELEMENT_DATA: any[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: "lib-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private paginator: MatPaginator;

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
    }
  }

  updateTableData(val: FakeData[]) {
    this.dataSource.data = val;
    this.dataSource.paginator = this.paginator;
  }

  searchTerm = new FormControl("");

  constructor() {}

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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
