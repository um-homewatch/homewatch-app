import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { ThingsInfo } from "../../../services/things_info";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js"
import { NewScenarioThingPage } from "../../scenario_things/new/new";
import { ListScenariosPage } from "../list/list"
import { ShowScenarioPopoverPage } from "./popover"

@Component({
  selector: 'show-scenario-page',
  templateUrl: 'show.html',
})
export class ShowScenarioPage {
  homewatch: HomewatchApi;
  scenario: any;
  scenarioThings: any;
  home: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public thingsInfo: ThingsInfo, public toastCtrl: ToastController, public homewatchApi: HomewatchApiService, public popoverCtrl: PopoverController) {
    this.homewatch = homewatchApi.getApi();
    this.scenario = this.navParams.get("scenario");
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    let response = await this.homewatch.scenarioThings(this.scenario).listScenarioThings();
    this.scenarioThings = response.data;
  }

  async applyScenario() {
    try {
      await this.homewatch.scenarioApplier(this.scenario).applyScenario();

      this.toastCtrl.create({
        message: "Scenario applied!",
        showCloseButton: true,
        duration: 2000,
      }).present();
    } catch (error) {
      console.log(error);
     }
  }


  getIconFromType(type: string) {
    return this.thingsInfo.getThingInfo(type).icon;
  }

  statusKeys(status: Object) {
    return Object.keys(status);
  }

  newScenarioThing() {
    this.navCtrl.push(NewScenarioThingPage, { home: this.home, scenario: this.scenario })
  }

  async showPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShowScenarioPopoverPage, { scenario: this.scenario, home: this.home });

    popover.onDidDismiss(async (deleted) => {
      if (deleted) this.navCtrl.setRoot(ListScenariosPage);
    });

    popover.present({
      ev: myEvent
    });
  }

  async deleteScenarioThing(scenarioThing, index) {
    await this.homewatch.scenarioThings(this.scenario).deleteScenarioThing(scenarioThing.id);
    this.scenarioThings.splice(index, 1);
  }
}
