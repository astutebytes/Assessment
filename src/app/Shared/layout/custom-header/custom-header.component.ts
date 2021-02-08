import { Component, Input } from "@angular/core";

@Component({
  selector: "app-custom-header",
  templateUrl: "custom-header.component.html",
})
export class CustomHeaderComponent {
  @Input() url?: string;
  @Input() urlText?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
}
