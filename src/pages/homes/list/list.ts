import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { AuthVerifier } from "../../../providers/auth-verifier/auth-verifier";
import { NewHomePage } from "../new/new";
import { ShowHomePage } from "../show/show";

@Component({
  selector: "list-homes-page",
  templateUrl: "list.html"
})
export class ListHomesPage {
  homewatch: Homewatch;
  user: Object;
  homes: Array<Object>;
  loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
  }

  async ionViewWillEnter() {
    try {
      this.user = this.navParams.get("user");
      let response = await this.homewatch.homes.listHomes();
      this.homes = response.data;
      this.loading = false;
    } catch (error) {
      console.log(error.response);
    }
  }

  newHome() {
    this.navCtrl.push(NewHomePage);
  }

  editHome(home: Object) {
    this.navCtrl.push(NewHomePage, { home });
  }

  listThings(home: Object) {
    this.navCtrl.setRoot(ShowHomePage, { home }, { animate: true, direction: "forward" });
  }
}
