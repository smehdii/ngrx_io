import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { WindowToken } from "src/app/shared/window";
import { CurrentDateToken } from "src/app/shared/current-date";

const LOCAL_STORAGE_NAMESPACE = "aio-notification/";

@Component({
  selector: "aio-notification",
  templateUrl: "notification.component.html",
  animations: [
    trigger("hideAnimation", [
      state("show", style({ height: "*" })),
      state("hide", style({ height: 0 })),
      transition("show => hide", animate(250))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  private get localStorage() {
    return this.window.localStorage;
  }

  @Input() dismissOnContentClick: boolean;
  @Input() notificationId: string;
  @Input() expirationDate: string;
  @Output() dismissed = new EventEmitter();

  @HostBinding("@hideAnimation")
  showNotification: "show" | "hide";

  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(CurrentDateToken) private currentDate: Date
  ) {}

  ngOnInit() {
    const previouslyHidden =
      this.localStorage.getItem(
        LOCAL_STORAGE_NAMESPACE + this.notificationId
      ) === "hide";
    const expired = this.currentDate > new Date(this.expirationDate);
    this.showNotification = previouslyHidden || expired ? "hide" : "show";
  }

  contentClick() {
    if (this.dismissOnContentClick) {
      this.dismiss();
    }
  }

  dismiss() {
    this.localStorage.setItem(
      LOCAL_STORAGE_NAMESPACE + this.notificationId,
      "hide"
    );
    this.showNotification = "hide";
    this.dismissed.next();
  }
}
