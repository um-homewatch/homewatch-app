import { Component } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { NavController, NavParams } from "ionic-angular";

import { ArraySorterHelper } from "../../../helpers/array_sorter";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewScenarioPage } from "../new/new";
import { ShowScenarioPage } from "../show/show";

@Component({
  selector: "page-list-scenarios",
  templateUrl: "list.html"
})
export class ListScenariosPage {
  homewatch: HomewatchApi;
  home: any;
  loading = true;
  scenarios: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    try {
      const response = await this.homewatch.scenarios(this.home).listScenarios();
      this.scenarios = ArraySorterHelper.sortArrayByID(response.data);
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  newScenario() {
    this.navCtrl.push(NewScenarioPage, { home: this.home });
  }

  showScenario(scenario: any) {
    this.navCtrl.push(ShowScenarioPage, { home: this.home, scenario });
  }

  editScenario(scenario: any) {
    this.navCtrl.push(NewScenarioPage, { home: this.home, scenario });
  }
}
