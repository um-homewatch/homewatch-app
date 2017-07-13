import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html",
})
export class ShowLockPage extends DevicePage {
  status: { locked: boolean };

  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    super(navParams, thingStatusService);
  }

  defaultStatus() {
    this.status = { locked: false };
  }
}
