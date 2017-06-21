import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../../services/thing_status";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html",
})
export class ShowLightPage {
  status: any;

  constructor(public navParams: NavParams, public thingStatus: ThingStatusService) {
    this.status = this.navParams.data.status;
  }

  async onStatusChange(newStatus) {
    this.thingStatus.announceStatus({ on: newStatus });
  }
}
