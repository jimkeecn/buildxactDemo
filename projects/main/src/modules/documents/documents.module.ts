import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentsComponent } from "./documents/documents.component";
import { DocumentsRoutingModule } from "./documents.routing.module";
import { SharedModule } from "projects/library/src/shared/shared.module";

@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, DocumentsRoutingModule, SharedModule]
})
export class DocumentsModule {}
