import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html",
})
export class ShowLightPage extends DevicePage {
  status: { on: boolean };

  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    super(navParams, thingStatusService);
  }

  defaultStatus() {
    this.status = { on: false };
  }
}
