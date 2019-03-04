// TO DO set topMenuNodes nodes

import {
  Component,
  HostBinding,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { MatSidenav } from "@angular/material";

import {
  CurrentNodes,
  NavigationService,
  NavigationNode,
  VersionInfo
} from "./navigation/navigation.service";
import {
  DocumentService,
  DocumentContents
} from "./documents/document.service";
import { BehaviorSubject } from "rxjs";
import { LocationService } from "./shared/location.service";
import { Deployment } from "./shared/deployment.service";
import { NotificationComponent } from "./layout/notification/notification.component";

const sideNavView = "SideNav";

@Component({
  selector: "aio-shell",
  templateUrl: "./app.component.html"
})
export class AppComponent implements AfterViewInit {
  currentDocument: DocumentContents;
  currentDocVersion: NavigationNode;
  currentNodes: CurrentNodes = {};
  currentPath: string;
  docVersions: NavigationNode[];
  dtOn = false;
  footerNodes: NavigationNode[];

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

  private sideBySideWidth = 992;
  sideNavNodes: NavigationNode[];
  topMenuNodes: NavigationNode[];
  topMenuNarrowNodes: NavigationNode[];

  hasFloatingToc = false;
  private showFloatingToc = new BehaviorSubject(false);
  private showFloatingTocWidth = 800;
  tocMaxHeight: string;
  private tocMaxHeightOffset = 0;

  versionInfo: VersionInfo;

  get isOpened() {
    return this.isSideBySide && this.isSideNavDoc;
  }
  get mode() {
    return this.isSideBySide ? "side" : "over";
  }

  // Search related properties
  // showSearchResults = false;
  // searchResults: Observable<SearchResults>;
  // @ViewChildren('searchBox, searchResultsView', { read: ElementRef })
  // searchElements: QueryList<ElementRef>;
  // @ViewChild(SearchBoxComponent) searchBox: SearchBoxComponent;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  notificationAnimating = false;

  constructor(
    public deployment: Deployment,
    private documentService: DocumentService,
    private hostElement: ElementRef,
    private locationService: LocationService,
    private navigationService: NavigationService
  ) {}

  notificationDismissed() {}

  ngAfterViewInit() {}
}
