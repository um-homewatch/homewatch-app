import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThingsInfo } from "../../../services/things_info";

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowScenarioPage {
  scenario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public thingsInfo: ThingsInfo) {
    this.scenario = this.navParams.get("scenario");
  }

  getIconFromType(type: string) {
    return this.thingsInfo.getThingInfo(type).icon;
  }

  stringify(status: Object) {
    return JSON.stringify(status);
  }
}
