import { Injectable } from "@angular/core";
import * as Homewatch from "homewatch-js";

@Injectable()
export class HomewatchApiService {
  homewatch: Homewatch;

  constructor() {
    this.homewatch = new Homewatch("https://homewatch-api.herokuapp.com", true);
  }

  getApi(): Homewatch {
    return this.homewatch;
  }
}
