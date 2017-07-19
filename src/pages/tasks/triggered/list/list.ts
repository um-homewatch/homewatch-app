import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { HomewatchApiService } from "../../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { AuthVerifier } from "../../../providers/auth-verifier/auth-verifier";
import { NewHomePage } from "../new/new";
import { HomeTabsPage } from "../tabs/tabs";

@Component({
  selector: "list-triggered-tasks-page",
  templateUrl: "list.html"
})
export class ListTriggeredTasksPage implements OnInit {
  homewatch: HomewatchApi;
  user: any;
  loading: boolean = true;
  home: any;
  triggered_tasks: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get("home");
    console.log(this.home);
  }

  async ngOnInit() {
    try {
      let response = await this.homewatch.triggeredTasks(this.home).listTriggeredTasks();
      console.log(response.data);
      this.triggered_tasks = response.data;
      this.loading = false;
    } catch (error) {
      //
    }
  }

  showTriggeredTask(triggered_task: any) {
    //this.navCtrl.push(ShowTriggeredTaskPage);
  }

  newTriggeredTask() {
    //this.navCtrl.push(NewTriggeredTaskPage);
  }

  editTriggeredTask(triggered_task: any) {
    //this.navCtrl.push(NewTriggeredTaskPage, { home, triggered_task });
  }

  formatDate(date_string: string) {
    return new Date(date_string).toLocaleString();
  }
}
