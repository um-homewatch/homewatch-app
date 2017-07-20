import { Component } from "@angular/core";
import { Events, NavParams } from "ionic-angular";
import { DevicePage } from "../device";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html"
})
export class ShowLightPage extends DevicePage {
  status: { on: boolean };

  constructor(public navParams: NavParams, public events: Events) {
    super(navParams, events);
  }

  defaultStatus() {
    this.status = { on: false };
  }
}
