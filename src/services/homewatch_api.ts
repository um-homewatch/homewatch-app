import { Injectable } from "@angular/core";
import * as Homewatch from "homewatch-js";

@Injectable()
export class HomewatchApiService {
  homewatch: Homewatch;

  constructor() {
    console.log("You done fucked it up");
    this.homewatch = new Homewatch("https://homewatch-api.herokuapp.com");
  }

  getApi(): Homewatch {
    return this.homewatch;
  }
}
