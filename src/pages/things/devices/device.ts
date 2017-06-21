import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ThingStatusService } from "../../../services/thing_status";

export abstract class DevicePage {
  status: any;

  constructor(public navParams: NavParams, public thingStatusService: ThingStatusService) {
    this.status = this.navParams.data.status;
  }

  async onStatusChange() {
    this.thingStatusService.announceStatus(this.status);
  }
}
