import { Injectable } from "@angular/core";
import { API_REGEX } from "./config/constants";

@Injectable()
export class AppService {
  customLink(url: string, token: string): string {
    const regex = new RegExp(API_REGEX.replace("$token", token));
    const parsedUrl = url.match(regex);
    const id = parsedUrl[1] || "";

    return `/${token}/${id}`;
  }
}
