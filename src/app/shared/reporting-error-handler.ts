import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { WindowToken } from "./window";

@Injectable()
export class ReportingErrorHandler extends ErrorHandler {
  constructor(@Inject(WindowToken) private window: Window) {
    super();
  }

  handleError(error: string | Error) {
    try {
      super.handleError(error);
    } catch (e) {
      this.reportError(e);
    }
    this.reportError(error);
  }

  private reportError(error: string | Error) {
    if (typeof error === "string") {
      this.window.onerror(error);
    } else {
      this.window.onerror(
        error.message,
        undefined,
        undefined,
        undefined,
        error
      );
    }
  }
}
