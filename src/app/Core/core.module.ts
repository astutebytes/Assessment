import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { HttpRequestInterceptor } from "./services/interceptors/http-request-interceptor";
import { LoadingService } from "./services/loader/loading.service";

@NgModule({
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
