import { Component } from "@angular/core";
import { Events, NavParams } from "ionic-angular";

import { DevicePage } from "../device";

@Component({
  selector: "page-show-motion-sensor",
  templateUrl: "show.html"
})
export class ShowMotionSensorPage extends DevicePage {
  status: { movement: boolean };

  constructor(public navParams: NavParams, public events: Events) {
    super(navParams, events);
  }

  defaultStatus() {
    this.status = { movement: false };
  }
}
