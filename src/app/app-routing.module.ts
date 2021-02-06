import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTES } from "./config/constants";

// Implementation of lazy loading for modules to optimize application in future development
const routes: Routes = [
  {
    path: ROUTES.FILMS,
    loadChildren: () =>
      import("./Films/films.module").then((m) => m.FilmsModule),
  },
  {
    path: ROUTES.SPECIES,
    loadChildren: () =>
      import("./Species/species.module").then((m) => m.SpeciesModule),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: ROUTES.FILMS,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
