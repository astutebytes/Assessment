import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FilmModel, FilmResponse } from "src/app/models/film.model";
import { HttpClient } from "@angular/common/http";
import { URL } from "src/app/config/constants";

@Injectable()
export class FilmService {
  constructor(private http: HttpClient) {}

  getFilms(): Observable<FilmResponse> {
    return this.http
      .get(URL.BASE + URL.FILMS)
      .pipe(map((res: FilmResponse) => res));
  }

  getFilm(id: string): Observable<FilmModel> {
    return this.http
      .get(URL.BASE + URL.FILMS + id)
      .pipe(map((res: FilmModel) => res));
  }
}
