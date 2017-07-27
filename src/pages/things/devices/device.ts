import { OnDestroy } from "@angular/core";
import { Events, NavParams } from "ionic-angular";

export abstract class DevicePage implements OnDestroy {
  thing: any;
  status: any;
  readOnly: false;

  constructor(public navParams: NavParams, public events: Events) {
    this.thing = this.navParams.get("thing");
    this.status = this.navParams.data.status;
    this.events.subscribe(`thing:status:update:in${this.thing.id}`, status => this.status = status);

    if (this.status === undefined) {
      this.defaultStatus();
      this.onStatusChange();
    }
  }

  async onStatusChange() {
    this.events.publish(`thing:status:update:out${this.thing.id}`, this.status);
  }

  ngOnDestroy() {
    this.events.unsubscribe(`thing:status:update:in${this.thing.id}`);
  }

  abstract defaultStatus();
}
