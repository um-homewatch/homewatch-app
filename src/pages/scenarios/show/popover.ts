import { Component } from "@angular/core";
import { AlertController, App, ViewController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";

@Component({
  selector: "show-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
      <button ion-item (click)="showAlert()">Delete Scenario</button>
    </ion-list>
  `
})
export class ShowScenarioPopoverPage {
  homewatch: HomewatchApi;
  scenario: any;
  home: any;
  alertVisible = false;

  constructor(public app: App, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.scenario = this.viewCtrl.data.scenario;
    this.home = this.viewCtrl.data.home;
  }

  showAlert() {
    this.alertVisible = true;
    const alert = this.alertCtrl.create({
      title: "Warning",
      message: "Do you really want to delete this scenario?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { this.viewCtrl.dismiss(); }
        },
        {
          text: "Yes",
          handler: () => { this.deleteScenario(); }
        }
      ]
    });
    alert.present();
  }

  async deleteScenario() {
    await this.homewatch.scenarios(this.home).deleteScenario(this.scenario.id);
    this.viewCtrl.dismiss({ deleted: true });
  }
}
