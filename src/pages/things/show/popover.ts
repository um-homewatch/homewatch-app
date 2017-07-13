import { Component } from "@angular/core";
import { App, IonicPage, ViewController, AlertController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { NewThingPage } from "../../things/new/new";

@Component({
  selector: "show-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
    <button ion-item (click)="editThing()">Edit Thing</button>
      <button ion-item (click)="showAlert()">Delete Thing</button>
    </ion-list>
  `
})
export class ShowThingPopoverPage {
  homewatch: HomewatchApi;
  home: any;
  thing: any;
  alertVisible: boolean = false;

  constructor(public app: App, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.viewCtrl.data.home;
    this.thing = this.viewCtrl.data.thing;
  }

  showAlert() {
    this.alertVisible = true;
    let alert = this.alertCtrl.create({
      title: "Warning",
      message: "Do you really want to delete this thing?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { this.viewCtrl.dismiss(); }
        },
        {
          text: "Yes",
          handler: () => { this.deleteThing(); }
        }
      ]
    });
    alert.present();
  }

  async deleteThing() {
    await this.homewatch.things(this.home).deleteThing(this.thing.id);
    this.viewCtrl.dismiss(true);
  }

  editThing() {
    this.app.getRootNav().push(NewThingPage, { thing: this.thing, home: this.home });
    this.viewCtrl.dismiss();
  }
}
