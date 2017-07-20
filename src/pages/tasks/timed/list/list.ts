import { Component, Input, OnChanges } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { HomewatchApiService } from "../../../../services/homewatch_api";
import { NewTimedTaskPage } from "../new/new";

@Component({
  selector: "list-timed-tasks-page",
  templateUrl: "list.html"
})
export class ListTimedTasksPage implements OnChanges {
  @Input() tasks: Array<any>;
  timed_tasks: Array<any> = [];
  homewatch: HomewatchApi;
  user: any;
  home: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
  }

  ngOnChanges(changes: any): void {
    if (changes.tasks.currentValue) {
      this.timed_tasks = changes.tasks.currentValue;
    }
  }

  async deleteTimedTask(timed_task: any, index: number) {
    await this.homewatch.timedTasks(this.home).deleteTimedTask(timed_task.id);
    this.timed_tasks.splice(index, 1);
  }

  editTimedTask(timed_task: any) {
    this.navCtrl.push(NewTimedTaskPage, { home: this.home, timed_task });
  }

  formatDate(date_string: string) {
    return new Date(date_string).toLocaleString();
  }
}
