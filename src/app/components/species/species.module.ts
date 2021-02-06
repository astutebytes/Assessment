import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpecieComponent } from "./specie/specie.component";
import { SpeciesRouting } from "./species.routing";
import { SpeciesService } from "./species.service";

@NgModule({
  declarations: [SpecieComponent],
  providers: [SpeciesService],
  imports: [CommonModule, SpeciesRouting],
})
export class SpeciesModule {}
