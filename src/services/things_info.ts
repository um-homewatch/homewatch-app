import { Injectable } from "@angular/core";
import { Page } from "ionic";
import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";

@Injectable()
export class ThingsInfo {
  things: Object = {
    "Things::Light": {
      showPage: ShowLightPage,
      text: "Light",
      icon: "bulb"
    },
    "Things::Lock": {
      showPage: ShowLockPage,
      text: "Lock",
      icon: "lock"
    },
    "Things::Thermostat": {
      text: "Thermostat",
      icon: "thermometer"
    },
    "Things::Weather": {
      text: "Weather",
      icon: "sunny"
    }
  };

  getOptions(): Array<Object> {
    return Object.keys(this.things).map(key => Object.assign(this.things[key], { type: key }));
  }

  getThingInfo(type: string): { showPage: any, text: string, icon: string } {
    return this.things[type];
  }
}
