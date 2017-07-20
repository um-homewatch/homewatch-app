import { Component } from "@angular/core";
import { Events, NavParams } from "ionic-angular";

import { DevicePage } from "../device";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html"
})
export class ShowLockPage extends DevicePage {
  status: { locked: boolean };

  constructor(public navParams: NavParams, public events: Events) {
    super(navParams, events);
  }

  defaultStatus() {
    this.status = { locked: false };
  }
}
