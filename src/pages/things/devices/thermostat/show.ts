import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";

@Component({
  selector: "page-show-thermostat",
  templateUrl: "show.html",
})
export class ShowThermostatPage {
  status: any;

  constructor(public navParams: NavParams, public thingStatus: ThingStatusService) {
    this.status = this.navParams.data.status;
  }

  range(j, k) {
    return Array
      .apply(null, Array((k - j) + 1))
      .map(function (discard, n) { return n + j; });
  }

  async onStatusChange(newStatus) {
    this.thingStatus.announceStatus({ targetTemperature: newStatus });
  }
}
