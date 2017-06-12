import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowScenarioPage {
  scenario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.scenario = this.navParams.get("scenario");
  }

  ionViewDidLoad() {

  }
}
