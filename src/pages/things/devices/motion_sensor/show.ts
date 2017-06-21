import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
  selector: "page-show-motion-sensor",
  templateUrl: "show.html",
})
export class ShowMotionSensorPage {
  status: any;

  constructor(public navParams: NavParams) {
    this.status = this.navParams.data.status;
  }
}
