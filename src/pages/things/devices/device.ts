import { Events, NavParams } from "ionic-angular";

export abstract class DevicePage {
  thing: any;
  status: any;

  constructor(public navParams: NavParams, public events: Events) {
    this.thing = this.navParams.get("thing");
    this.status = this.navParams.data.status;
    if (this.status === undefined) {
      this.defaultStatus();
      this.onStatusChange();
    }
  }

  async onStatusChange() {
    this.events.publish(`thing:status:update:${this.thing.id}`, this.status);
  }

  abstract defaultStatus();
}
