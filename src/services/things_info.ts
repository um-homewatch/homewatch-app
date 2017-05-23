import { Injectable } from "@angular/core";
import { Page } from "ionic";
import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";
import { ShowThermostatPage } from "../pages/things/devices/thermostat/show";
import { ShowWeatherPage } from "../pages/things/devices/weather/show";

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
      showPage: ShowThermostatPage,
      text: "Thermostat",
      icon: "thermometer"
    },
    "Things::Weather": {
      showPage: ShowWeatherPage,
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
