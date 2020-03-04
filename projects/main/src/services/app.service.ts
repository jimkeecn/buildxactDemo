import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class FakeData {
  employee_name: string;
  employee_salary: number;
  date?: Date;
}

@Injectable({
  providedIn: "root"
})
export class AppService {
  url: string = "http://dummy.restapiexample.com/api/v1/employees";

  constructor(private http: HttpClient) {}

  getFakeDataForPlans(): Observable<FakeData[]> {
    return this.http.get(this.url).pipe(
      map((res: any) => {
        let result: FakeData[] = res.data;
        result.forEach(i => {
          i.date = new Date();
        });
        return result;
      })
    );
  }

  getFakeDataForDocuments(): Observable<FakeData[]> {
    return this.http.get(this.url).pipe(
      map((res: any) => {
        res.data.forEach(i => {
          i.employee_name = i.employee_name + "(documents)";
          i.date = new Date();
        });

        return res.data;
      })
    );
  }
}
