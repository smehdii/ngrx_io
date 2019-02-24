import { Injectable } from "@angular/core";
import { Location, PlatformLocation } from "@angular/common";

import { ReplaySubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { GaService } from "./ga.service";
import { SwUpdatesService } from "../sw-updates/sw-updates.service";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  private readonly urlParser = document.createElement("a");
  private urlSubject = new ReplaySubject<string>(1);
  private swUpdateActivated = false;
  private baseHref: string;

  constructor() {}

  goExternal(url: string) {
    window.location.assign(url);
  }

  replace(url: string) {
    window.location.replace(url);
  }

  private stripSlashes(url: string) {
    return url.replace(/^\/+/, "").replace(/\/+(\?|#|$)/, "$1");
  }
}
