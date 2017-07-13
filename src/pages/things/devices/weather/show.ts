import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-weather",
  templateUrl: "show.html",
})
export class ShowWeatherPage extends DevicePage {
  status: {
    cloudy: boolean,
    raining: boolean,
    temperature: number,
    windSpeed: number
  };

  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    super(navParams, thingStatusService);
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
