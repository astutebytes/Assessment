import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomHeaderComponent } from "./custom-header/custom-header.component";

@NgModule({
  declarations: [CustomHeaderComponent],
  exports: [CustomHeaderComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
