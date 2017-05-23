import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html",
})
export class ShowThermostatPage {
  homewatch: Homewatch;
  thermostat: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.thermostat = this.navParams.data.thing;
  }

  async ionViewDidLoad() {
    try {
      let response = await this.homewatch.status(this.thermostat).getStatus();
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Coudn't reach this device!");
    }
  }

  range(j, k) {
    return Array
      .apply(null, Array((k - j) + 1))
      .map(function (discard, n) { return n + j; });
  }

  async onStatusChange(newStatus) {
    try {
      let response = await this.homewatch.status(this.thermostat).putStatus({ targetTemperature: newStatus });
      this.status = response.data;
    } catch (error) {
      this.status.targetTemperature = !this.status.targetTemperature;
      this.showErrorToast("Couldn't change the thermostat status");
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
