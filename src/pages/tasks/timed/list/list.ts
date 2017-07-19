import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { AuthVerifier } from "../../../providers/auth-verifier/auth-verifier";
import { NewHomePage } from "../new/new";
import { HomeTabsPage } from "../tabs/tabs";

@Component({
  selector: "list-timed-tasks-page",
  templateUrl: "list.html"
})
export class ListTimedTasksPage implements OnInit {
  homewatch: HomewatchApi;
  user: any;
  loading: boolean = true;
  home: any;
  timed_tasks: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
    console.log(this.home);
  }

  async ngOnInit() {
    try {
      let response = await this.homewatch.timedTasks(this.home).listTimedTasks();
      console.log(response.data);
      this.timed_tasks = response.data;
      this.loading = false;
    } catch (error) {
      //
    }
  }

  showTimedTask(timed_task: any) {
    //this.navCtrl.push(ShowTimedTaskPage);
  }

  newTimedTask() {
    //this.navCtrl.push(NewTimedTaskPage);
  }

  editTimedTask(timed_task: any) {
    //this.navCtrl.push(NewTimedTaskPage, { home, timed_task });
  }

  formatDate(date_string: string) {
    return new Date(date_string).toLocaleString();
  }
}
