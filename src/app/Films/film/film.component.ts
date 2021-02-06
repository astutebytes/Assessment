import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppService } from "src/app/Core/app.service";
import { ROUTES } from "src/app/config/constants";
import { FilmModel } from "src/app/models/film.model";
import { FilmService } from "../films.service";

@Component({
  selector: "app-film",
  templateUrl: "film.component.html",
})
export class FilmComponent implements OnInit, OnDestroy {
  filmsUrl = `/${ROUTES.FILMS}`;
  film: FilmModel;
  subscriptions: Array<Subscription> = [];
  isLoading = true;
  error = false;

  UIMapping = [
    { label: "description", key: "opening_crawl" },
    { label: "episode", key: "episode_id" },
    { label: "director", key: "director" },
    { label: "producer", key: "producer" },
    { label: "Release Date", key: "release_date" },
    { label: "species", key: "species", list: true, customURL: ROUTES.SPECIES },
    { label: "starships", key: "starships", list: true },
    { label: "vehicles", key: "vehicles", list: true },
    { label: "characters", key: "characters", list: true },
    { label: "planets", key: "planets", list: true },
    { label: "url", key: "url" },
    { label: "created", key: "created" },
    { label: "edited", key: "edited" },
  ];

  constructor(
    private filmService: FilmService,
    private appService: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isLoading = true;
        if (params.id && params.id !== "0") {
          this.fetchFilm(params.id);
        } else {
          this.isLoading = false;
          this.error = true;
        }
      })
    );
  }

  fetchFilm(filmId: string): void {
    this.subscriptions.push(
      this.filmService.getFilm(filmId).subscribe(
        (resp: FilmModel) => {
          this.film = resp;
          const customURLItems = this.UIMapping.filter((el) => el.customURL);
          customURLItems.forEach((item) => {
            const list: string[] = this.film[item.key];
            this.film[item.key] = list.map((str) => {
              return this.appService.customLink(str, item.customURL);
            });
          });
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
