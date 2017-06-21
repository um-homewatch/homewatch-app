import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-weather",
  templateUrl: "show.html",
})
export class ShowWeatherPage extends DevicePage {
  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    super(navParams, thingStatusService);
  }
}
