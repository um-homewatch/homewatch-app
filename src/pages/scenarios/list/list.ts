import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewScenarioPage } from "../new/new";
import { HomewatchApiService } from '../../../services/homewatch_api';

@Component({
  selector: 'page-list-scenarios',
  templateUrl: 'list.html',
})
export class ListScenariosPage {
  homewatch: Homewatch;
  home: any;
  scenarios: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApiService: HomewatchApiService) {
    console.log(this.navCtrl);
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    let response = await this.homewatch.scenarios(this.home).listScenarios();
    this.scenarios = response.data;
  }

  newScenario() {
    this.navCtrl.push(NewScenarioPage, { home: this.home });
  }
}
