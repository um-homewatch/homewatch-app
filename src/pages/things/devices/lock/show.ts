import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html",
})
export class ShowLockPage {
  homewatch: Homewatch;
  lock: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.lock = this.navParams.data.thing;
  }

  async ionViewDidLoad() {
    try {
      let response = await this.homewatch.status(this.lock).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  async onStatusChange(newStatus) {
    try {
      let response = await this.homewatch.status(this.lock).putStatus({ locked: newStatus });
      this.status = response.data;
    } catch (error) {
      this.status.locked = !this.status.locked;
      this.showErrorToast("Couldn't change the lock status");
    }
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }
}
