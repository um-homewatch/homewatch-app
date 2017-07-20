import { Component, Input, OnChanges } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "list-triggered-tasks-page",
  templateUrl: "list.html"
})
export class ListTriggeredTasksPage implements OnChanges {
  @Input() tasks: Array<any>;
  triggered_tasks: Array<any> = [];

  homewatch: HomewatchApi;
  user: any;
  home: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  ngOnChanges(changes: any): void {
    if (changes.tasks.currentValue) {
      this.triggered_tasks = changes.tasks.currentValue;
    }
  }

  newTriggeredTask() {
    // this.navCtrl.push(NewTriggeredTaskPage);
  }

  editTriggeredTask(_triggered_task: any) {
    // this.navCtrl.push(NewTriggeredTaskPage, { home, triggered_task });
  }

  formatDate(date_string: string) {
    return new Date(date_string).toLocaleString();
  }
}
