import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";
import { ShowThermostatPage } from "../pages/things/devices/thermostat/show";
import { ShowWeatherPage } from "../pages/things/devices/weather/show";
import { ShowMotionSensorPage } from "../pages/things/devices/motion_sensor/show";

export class ThingTypeInfo {
  subTypes: Array<string>;
  showPage: any;
  text: string;
  icon: string;
  type: string;
}

export class ThingInfo {
  subTypes: Array<string>;
  showPage: any;
  text: string;
  icon: string;
}

export class ThingsInfoHelper {
  private static things: { [key: string]: ThingInfo } = {
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

  static getTypeOptions(): Array<ThingTypeInfo> {
    return Object.keys(this.things).map(key => {
      return { ...this.things[key], type: key };
    });
  }

  static getThingInfo(type: string): { subTypes: Array<string>, showPage: any, text: string, icon: string } {
    return this.things[type];
  }
}
