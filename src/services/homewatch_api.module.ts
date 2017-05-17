import { NgModule, ModuleWithProviders } from "@angular/core";
import { HomewatchApiService } from "./homewatch_api";

@NgModule({})
export class HomewatchApiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomewatchApiModule,
      providers: [HomewatchApiService]
    };
  }
}
