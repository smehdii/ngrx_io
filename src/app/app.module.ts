import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatIconRegistry,
  MatProgressBarModule,
  MatToolbarModule
} from "@angular/material";
import { DocumentsService } from "./documents/documents.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // CustomElementsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [DocumentsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
