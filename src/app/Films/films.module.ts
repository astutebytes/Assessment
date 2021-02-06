import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilmComponent } from "./film/film.component";
import { FilmsRouting } from "./films.routing";
import { FilmsComponent } from "./films/films.component";
import { FilmService } from "./films.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../Shared/shared.module";

@NgModule({
  declarations: [FilmsComponent, FilmComponent],
  providers: [FilmService],
  imports: [CommonModule, FilmsRouting, FormsModule, SharedModule],
})
export class FilmsModule {}
