import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

export class BaseComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
