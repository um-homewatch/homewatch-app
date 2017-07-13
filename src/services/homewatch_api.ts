import { Injectable } from "@angular/core";
import { HomewatchApi } from "homewatch-js"

@Injectable()
export class HomewatchApiService {
  homewatch: HomewatchApi;

  constructor() {
    this.homewatch = new HomewatchApi("https://homewatch-api.herokuapp.com", false);
  }

  getApi(): HomewatchApi {
    return this.homewatch;
  }
}
