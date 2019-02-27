import { Injectable } from "@angular/core";
import { Location, PlatformLocation } from "@angular/common";

import { ReplaySubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { GaService } from "./ga.service";
import { SwUpdatesService } from "../sw-updates/sw-updates.service";

@Injectable()
export class LocationService {
  private readonly urlParser = document.createElement("a");
  private urlSubject = new ReplaySubject<string>(1);
  private swUpdateActivated = false;
  private baseHref: string;

  currentUrl = this.urlSubject.pipe(map(url => this.stripSlashes(url)));

  currentPath = this.currentUrl.pipe(
    map(url => (url.match(/[^?#]*/) || [])[0]), // strip query and hash
    tap(path => this.gaService.locationChanged(path))
  );

  constructor(
    private gaService: GaService,
    private location: Location,
    private platformLocation: PlatformLocation,
    swUpdates: SwUpdatesService
  ) {
    this.urlSubject.next(location.path(true));

    this.location.subscribe(state => {
      return this.urlSubject.next(state.url || "");
    });

    swUpdates.updateActivated.subscribe(() => (this.swUpdateActivated = true));
    this.baseHref = platformLocation.getBaseHrefFromDOM();
  }

  // TODO: ignore if url-without-hash-or-search matches current location?
  go(url: string | null | undefined) {
    if (!url) {
      return;
    }
    url = this.stripSlashes(this.location.normalize(url));
    if (/^http/.test(url) || this.swUpdateActivated) {
      // Has http protocol so leave the site
      // (or do a "full page navigation" if a ServiceWorker update has been activated)
      this.goExternal(url);
    } else {
      this.location.go(url);
      this.urlSubject.next(url);
    }
  }

  goExternal(url: string) {
    window.location.assign(url);
  }

  replace(url: string) {
    window.location.replace(url);
  }

  private stripSlashes(url: string) {
    return url.replace(/^\/+/, "").replace(/\/+(\?|#|$)/, "$1");
  }

  search() {
    const search: { [index: string]: string | undefined } = {};
    const path = this.location.path();
    const q = path.indexOf("?");
    if (q > -1) {
      try {
        const params = path.substr(q + 1).split("&");
        params.forEach(p => {
          const pair = p.split("=");
          if (pair[0]) {
            search[decodeURIComponent(pair[0])] =
              pair[1] && decodeURIComponent(pair[1]);
          }
        });
      } catch (e) {
        /* don't care */
      }
    }
    return search;
  }

  setSearch(label: string, params: { [key: string]: string | undefined }) {
    const search = Object.keys(params).reduce((acc, key) => {
      const value = params[key];
      return value === undefined
        ? acc
        : (acc +=
            (acc ? "&" : "?") +
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }, "");

    this.platformLocation.replaceState(
      {},
      label,
      this.platformLocation.pathname + search
    );
  }

  handleAnchorClick(
    anchor: HTMLAnchorElement,
    button = 0,
    ctrlKey = false,
    metaKey = false
  ) {
    // Check for modifier keys and non-left-button, which indicate the user wants to control navigation
    if (button !== 0 || ctrlKey || metaKey) {
      return true;
    }

    // If there is a target and it is not `_self` then we take this
    // as a signal that it doesn't want to be intercepted.
    // TODO: should we also allow an explicit `_self` target to opt-out?
    const anchorTarget = anchor.target;
    if (anchorTarget && anchorTarget !== "_self") {
      return true;
    }

    if (anchor.getAttribute("download") != null) {
      return true; // let the download happen
    }

    const { pathname, search, hash } = anchor;
    const relativeUrl = pathname + search + hash;
    this.urlParser.href = relativeUrl;

    // don't navigate if external link or has extension
    if (anchor.href !== this.urlParser.href || !/\/[^/.]*$/.test(pathname)) {
      return true;
    }

    // approved for navigation
    this.go(relativeUrl);
    return false;
  }

  getBaseHref() {
    return this.baseHref;
  }
}
