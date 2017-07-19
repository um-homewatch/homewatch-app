import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { ShowHomePage } from "../show/show";
import { ListScenariosPage } from "../../scenarios/list/list";
import { ListTasksPage } from "../../tasks/list/list";
import { ListTimedTasksPage } from "../../tasks/timed/list/list";

@Component({
  selector: "home-tabs-page",
  templateUrl: "tabs.html"
})
export class HomeTabsPage {
  params: any;
  tabHomeRoot: any;
  tabScenariosRoot: any;
  tabTasksRoot: any;

  constructor(navParams: NavParams) {
    this.params = { home: navParams.get("home") };
    this.tabHomeRoot = ShowHomePage;
    this.tabScenariosRoot = ListScenariosPage;
    this.tabTasksRoot = ListTasksPage;
  }
}
