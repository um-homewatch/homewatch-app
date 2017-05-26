import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, AfterContentInit } from "@angular/core";
import { ToastController, NavController, NavParams, PopoverController, Events } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { ThingsInfo } from "../../../services/things_info";
import { ThingStatusService } from "../../../services/thing_status";
import { ShowThingPopoverPage } from "../show/popover";
import { ShowHomePage } from "../../homes/show/show";
import { Subscription } from "rxjs";

@Component({
  selector: "show-thing",
  templateUrl: "show.html",
})
export class ShowThingPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  homewatch: Homewatch;
  home: any;
  thing: any;
  status: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public compFactoryResolver: ComponentFactoryResolver, public thingsInfo: ThingsInfo, public thingStatusService: ThingStatusService, public popoverCtrl: PopoverController, public events: Events) {
    this.homewatch = homewatchApiService.getApi();
    this.thing = this.navParams.data.thing;
    this.home = this.navParams.data.home;
    this.events.subscribe("things:updated", (thing) => {
      this.thing = thing;
    });
  }

  ionViewWillEnter() {
    this.thingStatus.clear();
    let compFactory = this.compFactoryResolver.resolveComponentFactory(this.thingsInfo.getThingInfo(this.thing.type).showPage);
    this.thingStatus.createComponent(compFactory);
    this.subscription = this.thingStatusService.statusAnnounced$.subscribe(status => { this.onStatusChange(status); });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async onStatusChange(newStatus) {
    try {
      let response = await this.homewatch.status(this.thing).putStatus(newStatus);
      this.status = response.data;
    } catch (error) {
      this.status.locked = !this.status.locked;
      this.showErrorToast("Couldn't change the device status");
    }
  }

  showErrorToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
    }).present();
  }

  async showPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShowThingPopoverPage, { home: this.home, thing: this.thing });

    popover.onDidDismiss(async (deleted) => {
      if (deleted) this.navCtrl.setRoot(ShowHomePage, { home: this.home });
    });

    popover.present({ ev: myEvent });
  }
}
