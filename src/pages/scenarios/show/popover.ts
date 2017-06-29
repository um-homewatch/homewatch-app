import { Component } from "@angular/core";
import { App, IonicPage, ViewController, AlertController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewHomePage } from "../../homes/new/new";
import { ListScenariosPage } from "../../scenarios/list/list";

@Component({
  selector: "show-home-popover-page",
  template: `
    <ion-list no-margin *ngIf="!alertVisible">
    <button ion-item (click)="listScenarios()">Scenarios</button>
      <button ion-item (click)="editScenarioThing()">Edit Home</button>
      <button ion-item (click)="showAlert()">Delete Home</button>
    </ion-list>
  `
})
export class ShowScenarioPopoverPage {
  homewatch: Homewatch;
  scenario: any;
  home: any;
  alertVisible: boolean = false;

  constructor(public app: App, public viewCtrl: ViewController, public alertCtrl: AlertController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.scenario = this.viewCtrl.data.scenario;
    this.home = this.viewCtrl.data.home;
  }

  showAlert() {
    this.alertVisible = true;
    let alert = this.alertCtrl.create({
      title: "Warning",
      message: "Do you really want to delete this scenario thing?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { this.viewCtrl.dismiss(); }
        },
        {
          text: "Yes",
          handler: () => { this.deleteScenarioThing(); }
        }
      ]
    });
    alert.present();
  }

  async deleteScenarioThing() {
    await this.homewatch.scenarios(this.home).deleteScenario(this.scenario.id);
  }
}
