import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { URL } from "src/app/config/constants";
import { SpeciesModel } from "src/app/models/species.model";

@Injectable()
export class SpeciesService {
  constructor(public httpClient: HttpClient) {}

  /**
   * Fetch specie detail
   * @param id specie id 
   */
  getSpecie(id: string): Observable<SpeciesModel> {
    return this.httpClient
      .get(URL.BASE + URL.SPECIES + id)
      .pipe(map((res: SpeciesModel) => res));
  }
}
