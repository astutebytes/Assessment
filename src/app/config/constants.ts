import { environment } from "src/environments/environment";

export const URL = {
  BASE: environment.BASE_URL,
  FILMS: "films/",
  SPECIES: "species/",
};

export const ROUTES = {
  FILMS: "films",
  SPECIES: "species",
};

export const COLUMNS = {
  FILMS: ["Sr. No.", "Title", "Episode", "Director", "Release Date", "Action"],
};

export const API_REGEX = environment.API_REGEX;
