import { Component, Input } from "@angular/core";

import { ThingsInfoHelper } from "../../helpers/things_info";

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

  getIconFromType(type: string) {
    return ThingsInfoHelper.getThingInfo(type).icon;
  }
}
