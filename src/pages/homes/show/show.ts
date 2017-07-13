import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController, PopoverController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { ListHomesPage } from "../list/list";
import { NewThingPage } from "../../things/new/new";
import { ShowHomePopoverPage } from "./popover";
import { ShowThingPage } from "../../things/show/show";
import { ThingsInfo } from "../../../services/things_info";

@Component({
  selector: "show-home-page",
  templateUrl: "show.html",
})
export class ShowHomePage {
  homewatch: HomewatchApi;
  home: any;
  things: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, homewatchApiService: HomewatchApiService, public thingsInfo: ThingsInfo) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    let response = await this.homewatch.things(this.home).listThings();
    this.things = response.data;
  }

  editThing(thing: any) {
    this.navCtrl.push(NewThingPage, { home: this.home, thing });
  }

  newThing() {
    this.navCtrl.push(NewThingPage, { home: this.home });
  }

  getIconFromType(type: string) {
    return this.thingsInfo.getThingInfo(type).icon;
  }

  async showPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShowHomePopoverPage, { home: this.home });

    popover.onDidDismiss(async (deleted) => {
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
