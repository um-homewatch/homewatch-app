import { Component } from "@angular/core";
import { Events, NavParams } from "ionic-angular";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-weather",
  templateUrl: "show.html"
})
export class ShowWeatherPage extends DevicePage {
  status: {
    cloudy: boolean,
    raining: boolean,
    temperature: number,
    windSpeed: number
  };

constructor(public navParams: NavParams, public events: Events) {
    super(navParams, events);
  }

  defaultStatus() {
    this.status = {
      cloudy: false,
      raining: false,
      temperature: 0,
      windSpeed: 0
    };
  }
}
