import { Component } from "@angular/core";
import { Events, NavParams } from "ionic-angular";

import { DevicePage } from "../device";

@Component({
  selector: "page-show-thermostat",
  templateUrl: "show.html"
})
export class ShowThermostatPage extends DevicePage {
  status: { targetTemperature: number };

  constructor(public navParams: NavParams, public events: Events) {
    super(navParams, events);
  }

  defaultStatus() {
    this.status = { targetTemperature: 16 };
  }

  range(j, k) {
    return Array
      .apply(undefined, Array((k - j) + 1))
      .map((_discard, n) => (n + j));
  }
}
