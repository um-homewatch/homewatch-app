import { Component } from "@angular/core";
import { AlertController, App, ViewController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { NewHomePage } from "../../homes/new/new";

@Component({
  selector: "show-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
      <button ion-item (click)="editHome()">Edit Home</button>
      <button ion-item (click)="showAlert()">Delete Home</button>
    </ion-list>
  `
})
export class ShowHomePopoverPage {
  homewatch: HomewatchApi;
  home: any;
  alertVisible = false;

  constructor(public app: App, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.viewCtrl.data.home;
  }

  showAlert() {
    this.alertVisible = true;
    const alert = this.alertCtrl.create({
      title: "Warning",
      message: "Do you really want to delete this home?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { this.viewCtrl.dismiss(); }
        },
        {
          text: "Yes",
          handler: () => { this.deleteHome(); }
        }
      ]
    });
    alert.present();
  }

  async deleteHome() {
    await this.homewatch.homes.deleteHome(this.home.id);
    this.viewCtrl.dismiss(true);
  }

  editHome() {
    this.app.getRootNav().push(NewHomePage, { home: this.home });
    this.viewCtrl.dismiss();
  }
}
