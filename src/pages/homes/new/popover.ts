import { Component } from "@angular/core";
import { AlertController, App, NavParams, ViewController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";

@Component({
  selector: "new-home-popover-page",
  template: `
    <ion-list no-margin>
      <button ion-item (click)="findHub()">Find Hub</button>
    </ion-list>
  `
})
export class NewHomePopoverPage {
  homewatch: HomewatchApi;
  callback: Function;

  constructor(public app: App, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.callback = this.navParams.get("callback");
  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: "OK",
          role: "cancel"
        }
      ]
    });

    alert.present();
  }

  async findHub() {
    this.viewCtrl.dismiss();

    try {
      const response = await this.homewatch.hub.getTunnel();

      this.showAlert("", `Found your hub with the following url: ${response.data.url}`);

      this.callback(response.data, undefined);
    } catch (error) {
      console.error(error);

      this.showAlert("Error", "Couldn't find a hub in your network!");

      this.callback(undefined, error);
    }
  }
}
