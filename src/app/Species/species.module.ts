import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../Shared/shared.module";
import { SpecieComponent } from "./specie/specie.component";
import { SpeciesRouting } from "./species.routing";
import { SpeciesService } from "./species.service";

@NgModule({
  declarations: [SpecieComponent],
  providers: [SpeciesService],
  imports: [CommonModule, SpeciesRouting, SharedModule],
})
export class SpeciesModule {}
