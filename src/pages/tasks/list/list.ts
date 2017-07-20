import { ArraySorterHelper } from "../../../helpers/array_sorter";
import { Component } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { NavController, NavParams } from "ionic-angular";

import { HomewatchApiService } from "../../../services/homewatch_api";
import { NewTimedTaskPage } from "../timed/new/new";

@Component({
  selector: "list-tasks-page",
  templateUrl: "list.html"
})
export class ListTasksPage {
  homewatch: HomewatchApi;
  home: any;
  tasks_type = "timed";
  timed_tasks: Array<any>;
  triggered_tasks: Array<any>;

  constructor(public navParams: NavParams, public navCtrl: NavController, homewatchApi: HomewatchApiService) {
    this.homewatch = homewatchApi.getApi();

    this.home = this.navParams.get("home");
  }

  async ionViewWillEnter() {
    await this.loadTask(this.tasks_type);
  }

  async onTypeChange(type) {
    this.tasks_type = type;

    await this.loadTask(type);
  }

  async loadTask(tasks_type) {
    switch (tasks_type) {
      case "triggered":
        await this.loadTriggeredTasks();
        break;
      case "timed":
        await this.loadTimedTasks();
        break;
    }
  }

  async loadTimedTasks() {
    const response = await this.homewatch.timedTasks(this.home).listTimedTasks();

    this.timed_tasks = ArraySorterHelper.sortArrayByID(response.data);
  }

  async loadTriggeredTasks() {
    const response = await this.homewatch.triggeredTasks(this.home).listTriggeredTasks();

    this.triggered_tasks = ArraySorterHelper.sortArrayByID(response.data);
  }

  newTask() {
    switch (this.tasks_type) {
      case "timed":
        this.navCtrl.push(NewTimedTaskPage, { home: this.home });
        break;
      case "triggered":
        // this.navCtrl.push(NewTriggeredTaskPage, { home: this.home });
        break;
    }
  }
}
