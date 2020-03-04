import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "inspector";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class FakeData {
  employee_name: string;
  employee_salary: number;
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  url: string = "http://dummy.restapiexample.com/api/v1/employees";

  constructor(private http: HttpClient) {}

  getFakeData(): Observable<any> {
    return this.http.get(this.url).pipe(map((res: any) => res.data));
  }
}
