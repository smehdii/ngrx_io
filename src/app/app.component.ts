import {
  Component,
  HostBinding,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { MatSidenav } from "@angular/material";

const sideNavView = "SideNav";

@Component({
  selector: "aio-shell",
  templateUrl: "./app.component.html"
})
export class AppComponent implements AfterViewInit {
  title = "MEHDI SIDDIK || Portfolio";

  // currentDocument: DocumentContents;
  // currentDocVersion: NavigationNode;
  // currentNodes: CurrentNodes = {};
  currentPath: string;
  // docVersions: NavigationNode[];
  dtOn = false;
  // footerNodes: NavigationNode[];

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

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  notificationDismissed() {}

  ngAfterViewInit() {
    console.log("sidenav", this.sidenav);
  }
}
