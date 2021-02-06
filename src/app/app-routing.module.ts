import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTES } from "./config/constants";

// Implementation of lazy loading for modules to optimize application in future development
const routes: Routes = [
  {
    path: ROUTES.FILMS,
    loadChildren: () =>
      import("./components/films/films.module").then((m) => m.FilmsModule),
  },
  {
    path: ROUTES.SPECIES,
    loadChildren: () =>
      import("./components/species/species.module").then(
        (m) => m.SpeciesModule
      ),
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
