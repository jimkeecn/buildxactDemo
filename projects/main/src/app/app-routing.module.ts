import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "plans",
    loadChildren: () =>
      import("../modules/plans/plans.module").then(m => m.PlansModule)
  },
  {
    path: "documents",
    loadChildren: () =>
      import("../modules/documents/documents.module").then(
        m => m.DocumentsModule
      )
  },
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
