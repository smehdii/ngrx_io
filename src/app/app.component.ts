import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "ngrxio";

  pageId: string;
  folderId: string;
  @HostBinding("class") hostClasses = "";

  // Disable all Angular animations for the initial render.
  @HostBinding("@.disabled") isStarting = true;
  isTransitioning = true;
  isFetching = false;
  isSideBySide = false;
  private isFetchingTimeout: any;
  private isSideNavDoc = false;
}
