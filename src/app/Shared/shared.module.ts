import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomHeaderComponent } from "./layout/custom-header/custom-header.component";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [CustomHeaderComponent],
  providers: [NgxSpinnerService],
  exports: [CustomHeaderComponent, NgxSpinnerModule],
  imports: [CommonModule, RouterModule, NgxSpinnerModule],
})
export class SharedModule {}
