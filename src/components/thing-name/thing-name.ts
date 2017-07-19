import { Component, Input } from "@angular/core";
import { ThingsInfo } from "../../services/things_info";

@Component({
  selector: "thing-name",
  template: `
    <div>
      <ion-icon class="inline font-large primary" name="{{getIconFromType(thing.type)}}"></ion-icon>
      <div class="inline">{{thing.name}}</div>
    </div>
  `
})
export class ThingNameComponent {
  @Input() thing: any;

  constructor(public thingsInfo: ThingsInfo) { }

  getIconFromType(type: string) {
    return this.thingsInfo.getThingInfo(type).icon;
  }
}
