import { Component, AfterContentInit } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";
import { ThingStatusService } from "../../../../services/thing_status";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html",
})
export class ShowLightPage implements AfterContentInit {
  homewatch: Homewatch;
  light: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public thingStatus: ThingStatusService) {
    this.homewatch = homewatchApiService.getApi();
    this.light = this.navParams.data.thing;
  }

  async ngAfterContentInit() {
    try {
      let response = await this.homewatch.status(this.light).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  async onStatusChange(newStatus) {
    this.thingStatus.announceStatus({ on: newStatus });
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }
}
