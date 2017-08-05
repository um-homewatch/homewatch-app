import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { HomewatchApi } from "homewatch-js";
import { Events, NavController, NavParams, PopoverController, ToastController } from "ionic-angular";

import { ThingsInfoHelper } from "../../../helpers/things_info";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchSockets } from "../../../services/homewatch_sockets";
import { ShowHomePage } from "../../homes/show/show";
import { ShowThingPopoverPage } from "../show/popover";

@Component({
  selector: "show-thing",
  templateUrl: "show.html"
})
export class ShowThingPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  homewatch: HomewatchApi;
  cleanHomewatch: HomewatchApi;
  home: any;
  thing: any;
  status: any;
  interval: NodeJS.Timer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public compFactoryResolver: ComponentFactoryResolver, public popoverCtrl: PopoverController, public events: Events, public homewatchSockets: HomewatchSockets) {
    this.homewatch = homewatchApiService.getApi();
    this.cleanHomewatch = homewatchApiService.getCleanApi();

    this.thing = this.navParams.data.thing;
    this.home = this.navParams.data.home;

    this.events.subscribe("things:updated", thing => {
      this.thing = thing;
      this.loadThingStatus();
    });

    this.homewatchSockets.subscribeToThing(this.thing, this.refreshStatus);
  }

  ionViewWillEnter() {
    this.events.subscribe(`thing:status:update:out${this.thing.id}`, status => { this.onStatusChange(status); });

    this.loadThingStatus();
  }

  ionViewWillLeave() {
    this.events.unsubscribe(`thing:status:update:out${this.thing.id}`);
    this.events.unsubscribe("things:updated");
    clearInterval(this.interval);
    this.homewatchSockets.removeSubscription();
  }

  async loadThingStatus() {
    try {
      await this.preloadThingStatus();
      this.initRealtimeUpdates();

      this.thingStatus.clear();
      const compFactory = this.compFactoryResolver.resolveComponentFactory(ThingsInfoHelper.getThingInfo(this.thing.type).showPage);
      const instance = this.thingStatus.createComponent(compFactory).instance;
      instance["readOnly"] = true;
    } catch (error) {
      this.showErrorToast("Couldn't reach the device");
      this.status = undefined;
    }
  }

  async preloadThingStatus() {
    const response = await this.homewatch.status(this.thing).getStatus();
    this.status = response.data;
    this.navParams.data.status = this.status;
  }

  initRealtimeUpdates() {
    this.interval = setInterval(() => this.homewatchSockets.requestThingUpdate(this.thing), 2500);
  }

  async onStatusChange(newStatus) {
    clearInterval(this.interval);

    try {
      const response = await this.homewatch.status(this.thing).putStatus(newStatus);
      this.status = response.data;
    } catch (error) {
      this.showErrorToast("Couldn't change the device status");
    }

    this.initRealtimeUpdates();
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      showCloseButton: true
    }).present();
  }

  async showPopover(myEvent) {
    const popover = this.popoverCtrl.create(ShowThingPopoverPage, { home: this.home, thing: this.thing });

    popover.onDidDismiss(async deleted => {
      if (deleted) this.navCtrl.setRoot(ShowHomePage, { home: this.home });
    });

    popover.present({ ev: myEvent });
  }

  private refreshStatus = (status: any) => {
    this.status = status;
    this.events.publish(`thing:status:update:in${this.thing.id}`, this.status);
  }
}
