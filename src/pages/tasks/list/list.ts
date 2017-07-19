import { Component } from "@angular/core";
import { ListTimedTasksPage } from "../timed/list/list";

@Component({
  selector: "list-tasks-page",
  templateUrl: "list.html"
})
export class ListTasksPage {
  tasks_type: string = "timed";
}
