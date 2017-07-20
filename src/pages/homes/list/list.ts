import { Component } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { ArraySorterHelper } from "../../../helpers/array_sorter";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewHomePage } from "../new/new";
import { HomeTabsPage } from "../tabs/tabs";

@Component({
  selector: "list-homes-page",
  templateUrl: "list.html"
})
export class ListHomesPage {
  homewatch: HomewatchApi;
  user: any;
  loading = true;
  homes: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
  }

  async ionViewWillEnter() {
    try {
      this.user = this.navParams.get("user");
      const response = await this.homewatch.homes.listHomes();
      this.homes = ArraySorterHelper.sortArrayByID(response.data);
      this.loading = false;
    } catch (error) {
      //
    }
  }

  newHome() {
    this.navCtrl.push(NewHomePage);
  }

  editHome(home: Object) {
    this.navCtrl.push(NewHomePage, { home });
  }

  listThings(home: Object) {
    this.navCtrl.setRoot(HomeTabsPage, { home }, { animate: true, direction: "forward" });
  }
}
