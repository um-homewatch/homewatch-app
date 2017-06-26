import { Injectable } from "@angular/core";
import { Page } from "ionic";
import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";
import { ShowThermostatPage } from "../pages/things/devices/thermostat/show";
import { ShowWeatherPage } from "../pages/things/devices/weather/show";
import { ShowMotionSensorPage } from "../pages/things/devices/motion_sensor/show";

@Injectable()
export class ThingsInfo {
  things: Object = {
    "Things::Light": {
      subTypes: ["rest", "coap", "hue"],
      showPage: ShowLightPage,
      text: "Light",
      icon: "bulb"
    },
    "Things::Lock": {
      subTypes: ["rest"],
      showPage: ShowLockPage,
      text: "Lock",
      icon: "lock"
    },
    "Things::Thermostat": {
      subTypes: ["rest"],
      showPage: ShowThermostatPage,
      text: "Thermostat",
      icon: "thermometer"
    },
    "Things::Weather": {
      subTypes: ["rest", "owm"],
      showPage: ShowWeatherPage,
      text: "Weather",
      icon: "sunny"
    },
    "Things::MotionSensor": {
      subTypes: ["rest"],
      showPage: ShowMotionSensorPage,
      text: "Motion Sensor",
      icon: "eye"
    }
  };

  getTypeOptions(): Array<Object> {
    return Object.keys(this.things).map(key => Object.assign(this.things[key], { type: key }));
  }

  getThingInfo(type: string): { subTypes: Array<string>, showPage: any, text: string, icon: string } {
    return this.things[type];
  }
}
