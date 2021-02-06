import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { COLUMNS, ROUTES } from "src/app/config/constants";
import { FilmModel, FilmResponse } from "src/app/models/film.model";
import { FilmService } from "../films.service";
import { BaseComponent } from "src/app/Shared/common/base.component";
import { customLink } from "src/app/Shared/common/utils";

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
})
export class FilmsComponent extends BaseComponent implements OnInit {
  all_films: FilmModel[];
  films: FilmModel[];
  columns = COLUMNS.FILMS;
  search: string = "";

  constructor(private filmService: FilmService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filmService.getFilms().subscribe((resp: FilmResponse) => {
        this.all_films = resp.results;
        this.films = resp.results;
      })
    );
  }

  searchTable(): void {
    if (this.search === "") {
      this.films = this.all_films;
    } else {
      this.films = this.all_films.filter((film) => {
        return (
          film.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
          film.opening_crawl
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) !== -1
        );
      });
    }
  }

  onRowSelect(url: string): void {
    const redirectUrl = customLink(url, ROUTES.FILMS);

    this.router.navigateByUrl(redirectUrl);
  }
}
