import { Routes, RouterModule } from "@angular/router";
import { PlansComponent } from "./plans/plans.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: PlansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule {}
