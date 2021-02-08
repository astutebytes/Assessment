import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { COLUMNS } from "src/app/Core/app-constants";
import {
  FilmModel,
  FilmResponse,
} from "src/app/modules/Films/_models/film.model";
import { FilmService } from "../services/films.service";
import { BaseComponent } from "src/app/Shared/components/base.component";

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
    // when the component is initialized it will fetch all the films
    // to show list of films on view
    this.subscriptions.push(
      this.filmService.getFilms().subscribe((resp: FilmResponse) => {
        this.all_films = resp.results;
        this.films = resp.results;
      })
    );
  }

  //  this method is used to filter films based on search keyword
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

  // No longer need of onRowSelect on this component as it is now used in child component

  // onRowSelect(url: string): void {
  //   const redirectUrl = customLink(url, ROUTES.FILMS);

  //   this.router.navigateByUrl(redirectUrl);
  // }
}
