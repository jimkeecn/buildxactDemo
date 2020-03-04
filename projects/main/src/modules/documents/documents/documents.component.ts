import { Component, OnInit } from "@angular/core";
import { AppService } from "projects/main/src/services/app.service";
import { FakeData } from "./../../../services/app.service";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"]
})
export class DocumentsComponent implements OnInit {
  constructor(public appService: AppService) {}
  data: FakeData[];
  ngOnInit(): void {
    this.appService.getFakeDataForDocuments().subscribe(res => {
      this.data = res;
    });
  }
}
