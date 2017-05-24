import { Component, AfterContentInit } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";
import { ThingStatusService } from "../../../../services/thing_status";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html",
})
export class ShowLockPage implements AfterContentInit {
  homewatch: Homewatch;
  lock: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public thingStatus: ThingStatusService) {
    this.homewatch = homewatchApiService.getApi();
    this.lock = this.navParams.data.thing;
  }

  async ngAfterContentInit() {
    try {
      let response = await this.homewatch.status(this.lock).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  async onStatusChange(newStatus) {
    this.thingStatus.announceStatus({ locked: newStatus });
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }
}
