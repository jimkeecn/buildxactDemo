import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlansComponent } from "./plans/plans.component";
import { PlansRoutingModule } from "./plans.routing.module";
import { SharedModule } from "projects/library/src/shared/shared.module";

@NgModule({
  declarations: [PlansComponent],
  imports: [CommonModule, PlansRoutingModule, SharedModule]
})
export class PlansModule {}
