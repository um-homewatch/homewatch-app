import { Component, EventEmitter, Output, AfterContentInit } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";
import { ThingStatusService } from "../../../../services/thing_status";

@Component({
  selector: "page-show-lock",
  templateUrl: "show.html",
})
export class ShowThermostatPage implements AfterContentInit {
  @Output() onChange = new EventEmitter<any>();
  homewatch: Homewatch;
  thermostat: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public thingStatus: ThingStatusService) {
    this.homewatch = homewatchApiService.getApi();
    this.thermostat = this.navParams.data.thing;
  }

  async ngAfterContentInit() {
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
    this.thingStatus.announceStatus({ targetTemperature: newStatus });
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }
}
