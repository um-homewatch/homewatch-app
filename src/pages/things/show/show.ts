import { Component, Input } from "@angular/core";

@Component({
  selector: "show-thing",
  templateUrl: "show.html",
})
export class ShowThingPage {
  @Input("thing") thing: any;
}
