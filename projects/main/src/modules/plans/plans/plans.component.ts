import { Component, OnInit } from "@angular/core";
import { AppService, FakeData } from "projects/main/src/services/app.service";

@Component({
  selector: "app-plans",
  templateUrl: "./plans.component.html",
  styleUrls: ["./plans.component.scss"]
})
export class PlansComponent implements OnInit {
  constructor(public appService: AppService) {}
  data: FakeData[];
  ngOnInit(): void {
    this.appService.getFakeDataForPlans().subscribe(res => {
      this.data = res;
    });
  }
}
