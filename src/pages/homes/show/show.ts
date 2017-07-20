import { Component } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { NavController, NavParams, PopoverController } from "ionic-angular";

import { ArraySorterHelper } from "../../../helpers/array_sorter";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewThingPage } from "../../things/new/new";
import { ShowThingPage } from "../../things/show/show";
import { ListHomesPage } from "../list/list";
import { ShowHomePopoverPage } from "./popover";

@Component({
  selector: "show-home-page",
  templateUrl: "show.html"
})
export class ShowHomePage {
  homewatch: HomewatchApi;
  home: any;
  things: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    const response = await this.homewatch.things(this.home).listThings();
    this.things = ArraySorterHelper.sortArrayByID(response.data);
  }

  editThing(thing: any) {
    this.navCtrl.push(NewThingPage, { home: this.home, thing });
  }

  newThing() {
    this.navCtrl.push(NewThingPage, { home: this.home });
  }

  async showPopover(myEvent) {
    const popover = this.popoverCtrl.create(ShowHomePopoverPage, { home: this.home });

    popover.onDidDismiss(async deleted => {
      if (deleted) this.navCtrl.setRoot(ListHomesPage);
    });

    popover.present({
      ev: myEvent
    });
  }

  showThing(thing: any) {
    this.navCtrl.push(ShowThingPage, { thing, home: this.home });
  }
}
