import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppService } from "src/app/Core/app.service";
import { ROUTES } from "src/app/config/constants";
import { FilmModel, FilmResponse } from "src/app/models/film.model";
import { FilmService } from "../films.service";

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
})
export class FilmsComponent implements OnInit, OnDestroy {
  all_films: FilmModel[];
  films: FilmModel[];
  subscriptions: Array<Subscription> = [];
  isLoading = true;
  error = false;
  columns = ["Sr. No.", "Title", "Episode", "Director", "Release Date", ""];
  search: string = "";

  constructor(
    public filmService: FilmService,
    public router: Router,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.filmService.getFilms().subscribe(
        (resp: FilmResponse) => {
          this.all_films = resp.results;
          this.films = resp.results;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.error = true;
          // We can show error message to user as well by assigning to a variable.
        }
      )
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
    const redirectUrl = this.appService.customLink(url, ROUTES.FILMS);

    this.router.navigateByUrl(redirectUrl);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
