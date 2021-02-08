import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FilmModel } from "src/app/modules/Films/_models/film.model";
import { FilmService } from "../services/films.service";
import { BaseComponent } from "src/app/Shared/components/base.component";
import { customLink } from "src/app/Core/utils/utils";

import { _films_route, _species_route } from "src/app/Core/_data/route";

@Component({
  selector: "app-film",
  templateUrl: "film.component.html",
})
export class FilmComponent extends BaseComponent implements OnInit {
  filmsUrl = `/${_films_route}`;
  film: FilmModel;

  UIMapping = [
    { label: "description", key: "opening_crawl" },
    { label: "episode", key: "episode_id" },
    { label: "director", key: "director" },
    { label: "producer", key: "producer" },
    { label: "Release Date", key: "release_date" },
    { label: "species", key: "species", list: true, customURL: _species_route },
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
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id && params.id !== "0") {
          this.fetchFilm(params.id);
        }
      })
    );
  }

  fetchFilm(filmId: string): void {
    this.subscriptions.push(
      this.filmService.getFilm(filmId).subscribe((resp: FilmModel) => {
        this.film = resp;
        const customURLItems = this.UIMapping.filter((el) => el.customURL);
        customURLItems.forEach((item) => {
          const list: string[] = this.film[item.key];
          this.film[item.key] = list.map((str) => {
            return customLink(str, item.customURL);
          });
        });
      })
    );
  }
}
