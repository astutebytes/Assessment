import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { SpeciesModel } from "src/app/modules/Species/_models/species.model";
import { SpeciesService } from "../services/species.service";
import { BaseComponent } from "src/app/Shared/components/base.component";
import { customLink } from "src/app/Core/utils/utils";

import { _films_route } from "src/app/Core/_data/route";

@Component({
  selector: "app-specie",
  templateUrl: "specie.component.html",
})
export class SpecieComponent extends BaseComponent implements OnInit {
  filmsUrl = `/${_films_route}`;
  specie: SpeciesModel;

  UIMapping = [
    { label: "classification", key: "classification" },
    { label: "designation", key: "designation" },
    { label: "Average Height", key: "average_height" },
    { label: "Average Lifespan", key: "average_lifespan" },
    { label: "Eye Colors", key: "eye_colors" },
    { label: "Hair Colors", key: "hair_colors" },
    { label: "Skin Colors", key: "skin_colors" },
    { label: "language", key: "language" },
    { label: "homeworld", key: "homeworld" },
    { label: "people", key: "people", list: true },
    { label: "films", key: "films", list: true, customURL: _films_route },
    { label: "url", key: "url" },
    { label: "created", key: "created" },
    { label: "edited", key: "edited" },
  ];

  constructor(
    private specieService: SpeciesService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id && params.id !== "0") {
          this.fetchSpecie(params.id);
        }
      })
    );
  }

  fetchSpecie(id: string): void {
    this.subscriptions.push(
      this.specieService.getSpecie(id).subscribe((resp: SpeciesModel) => {
        this.specie = resp;
        const customURLItems = this.UIMapping.filter((el) => el.customURL);
        customURLItems.forEach((item) => {
          const list: string[] = this.specie[item.key];
          this.specie[item.key] = list.map((str) => {
            return customLink(str, item.customURL);
          });
        });
      })
    );
  }
}
