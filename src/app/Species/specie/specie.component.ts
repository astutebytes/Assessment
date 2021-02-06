import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppService } from "src/app/Core/app.service";
import { ROUTES } from "src/app/config/constants";
import { SpeciesModel } from "src/app/models/species.model";
import { SpeciesService } from "../species.service";

@Component({
  selector: "app-specie",
  templateUrl: "specie.component.html",
})
export class SpecieComponent implements OnInit, OnDestroy {
  filmsUrl = `/${ROUTES.FILMS}`;
  specie: SpeciesModel;
  subscriptions: Array<Subscription> = [];
  isLoading = true;
  error = false;

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
    { label: "films", key: "films", list: true, customURL: ROUTES.FILMS },
    { label: "url", key: "url" },
    { label: "created", key: "created" },
    { label: "edited", key: "edited" },
  ];

  constructor(
    public specieService: SpeciesService,
    public appService: AppService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isLoading = true;
        if (params.id && params.id !== "0") {
          this.fetchSpecie(params.id);
        } else {
          this.isLoading = false;
          this.error = true;
        }
      })
    );
  }

  fetchSpecie(id: string): void {
    this.subscriptions.push(
      this.specieService.getSpecie(id).subscribe(
        (resp: SpeciesModel) => {
          this.specie = resp;
          const customURLItems = this.UIMapping.filter((el) => el.customURL);
          customURLItems.forEach((item) => {
            const list: string[] = this.specie[item.key];
            this.specie[item.key] = list.map((str) => {
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
