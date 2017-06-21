import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html",
})
export class ShowWeatherPage {
  status: any;

  constructor(public navParams: NavParams) {
    this.status = this.navParams.data.status;
  }
}
