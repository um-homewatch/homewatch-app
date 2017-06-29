import { Component } from "@angular/core";
import { App, IonicPage, ViewController, AlertController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewHomePage } from "../../homes/new/new";
import { ListScenariosPage } from "../../scenarios/list/list";

@Component({
  selector: "new-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
      <button ion-item (click)="findHub()">Find Hub</button>
    </ion-list>
  `
})
export class NewHomePopoverPage {
  homewatch: Homewatch;
  callback: Function;

  constructor(public app: App, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.callback = this.navParams.get("callback");
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: "OK",
          role: "cancel"
        },
      ]
    });

    alert.present();
  }

  async findHub() {
    this.viewCtrl.dismiss();
    
    try {
      let response = await this.homewatch.hub.getTunnel();

      this.showAlert("", `Found your hub with the following url: ${response.data.url}`);

      this.callback(response.data, null);
    } catch (error) {
      console.log(error);

      this.showAlert("Error", "Couldn't find a hub in your network!");

      this.callback(null, error);
    }
  }
}
