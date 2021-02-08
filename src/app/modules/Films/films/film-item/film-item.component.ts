import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FilmModel } from "src/app/modules/Films/_models/film.model";
import { customLink } from "src/app/Core/utils/utils";

import { _films_route } from "src/app/Core/_data/route";

@Component({
  selector: "app-film-item",
  templateUrl: "./film-item.component.html",
})
export class FilmItemComponent implements OnInit {
  // Inputs are assigned values
  // which are passed from parent component (FilmsComponent.html)

  @Input() films: FilmModel[];
  @Input() columns: string[];

  constructor(private router: Router) {}

  ngOnInit() {}

  // onRowSelect is used to get url for specific item for return URL

  onRowSelect(url: string): void {
    const redirectUrl = customLink(url, _films_route);

    this.router.navigateByUrl(redirectUrl);
  }
}
