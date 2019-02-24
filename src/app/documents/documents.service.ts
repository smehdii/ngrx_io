import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { AsyncSubject, Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";

import { DocumentContents } from "./document-contents";
export { DocumentContents } from "./document-contents";

// import { LocationService } from 'app/shared/location.service';
// import { Logger } from 'app/shared/logger.service';

export const FILE_NOT_FOUND_ID = "file-not-found";
export const FETCHING_ERROR_ID = "fetching-error";

export const CONTENT_URL_PREFIX = "generated/";
export const DOC_CONTENT_URL_PREFIX = CONTENT_URL_PREFIX + "docs/";
const FETCHING_ERROR_CONTENTS = `
  <div class="nf-container l-flex-wrap flex-center">
    <div class="nf-icon material-icons">error_outline</div>
    <div class="nf-response l-flex-wrap">
      <h1 class="no-toc">Request for document failed.</h1>
      <p>
        We are unable to retrieve the "<current-location></current-location>" page at this time.
        Please check your connection and try again later.
      </p>
    </div>
  </div>
`;
@Injectable()
export class DocumentsService {
  currentDocument: Observable<DocumentContents>;
  baseHref: string;

  constructor() {}
}
