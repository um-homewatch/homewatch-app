import { Component } from "@angular/core";
import { IonicPage, ViewController, AlertController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";

@Component({
  selector: "show-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
      <button ion-item (click)="showAlert()">Delete Home</button>
    </ion-list>
  `
})
export class ShowHomePopoverPage {
  homewatch: Homewatch;
  alertVisible: boolean = false;

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
  }

  showAlert() {
    this.alertVisible = true;
    let alert = this.alertCtrl.create({
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
    let home = this.viewCtrl.data.home;
    await this.homewatch.homes.deleteHome(home.id);
    this.viewCtrl.dismiss(true);
  }
}
