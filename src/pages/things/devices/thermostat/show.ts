import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-thermostat",
  templateUrl: "show.html",
})
export class ShowThermostatPage extends DevicePage {
  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    super(navParams, thingStatusService);
  }

  range(j, k) {
    return Array
      .apply(null, Array((k - j) + 1))
      .map(function (discard, n) { return n + j; });
  }
}



