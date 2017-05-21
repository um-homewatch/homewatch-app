import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "page-show-light",
  templateUrl: "show.html",
})
export class ShowLightPage {
  homewatch: Homewatch;
  light: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.light = this.navParams.data.thing;
  }

  async ionViewDidLoad() {
    try {
      let response = await this.homewatch.status(this.light).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  async onStatusChange(newStatus) {
    try {
      let response = await this.homewatch.status(this.light).putStatus({ on: newStatus });
      this.status = response.data;
    } catch (error) {
      this.status.on = !this.status.on;
      this.showErrorToast("Couldn't change the light status");
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
