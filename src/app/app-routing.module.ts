import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { _films_route, _species_route } from "./Core/_data/route";

// Implementation of lazy loading for modules to optimize application in future development
const routes: Routes = [
  {
    path: _films_route,
    loadChildren: () =>
      import("./modules/Films/films.module").then((m) => m.FilmsModule),
  },
  {
    path: _species_route,
    loadChildren: () =>
      import("./modules/Species/species.module").then((m) => m.SpeciesModule),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: _films_route,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
