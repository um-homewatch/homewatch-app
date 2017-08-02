import { Component } from "@angular/core";
import { AlertController, App, NavParams, ViewController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";

@Component({
  selector: "new-thing-popover-page",
  template: `
    <ion-list no-margin>
      <button ion-item (click)="discoverDevices()">Find devices</button>
    </ion-list>
  `
})
export class NewThingPopoverPage {
  homewatch: HomewatchApi;
  callback: Function;
  home: any;
  discoveryParams: any;

  constructor(public app: App, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.callback = this.navParams.get("callback");
    this.home = this.navParams.get("home");
    this.discoveryParams = this.navParams.get("discoveryParams");
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

  showRadioAlert(devices: Array<any>) {
    const alert = this.alertCtrl.create({
      title: "Discovered Things"
    });

    devices.forEach(device => {
      alert.addInput({
        type: 'radio',
        label: `${device.type} ${device.subtype}`,
        value: device
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data: any) => {
        this.callback(data, undefined);
      }
    });

    alert.present();
  }

  async discoverDevices() {
    this.viewCtrl.dismiss();

    try {
      const response = await this.homewatch.things(this.home).discoverThings(this.discoveryParams);

      if (response.data.length === 0)
        this.showAlert("Error", "Couldn't find any device on your network!");
      else
        this.showRadioAlert(response.data);

    } catch (error) {
      console.error(error);

      this.showAlert("Error", "Couldn't find any device on your network!");

      this.callback(undefined, error);
    }
  }
}
