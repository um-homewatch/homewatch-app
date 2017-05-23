import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { ThingsInfo } from "../../../services/things_info";
import { ThingStatusService } from "../../../services/thing_status";

@Component({
  selector: "show-thing",
  templateUrl: "show.html",
})
export class ShowThingPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  homewatch: Homewatch;
  thing: any;
  status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, homewatchApiService: HomewatchApiService, public compFactoryResolver: ComponentFactoryResolver, public thingsInfo: ThingsInfo, public thingStatusService: ThingStatusService) {
    this.homewatch = homewatchApiService.getApi();
    this.thing = this.navParams.data.thing;
    this.thingStatusService.statusAnnounced$.subscribe(status => { this.onStatusChange(status); });
  }

  ngAfterContentInit() {
    let compFactory = this.compFactoryResolver.resolveComponentFactory(this.thingsInfo.getThingInfo(this.thing.type).showPage);
    this.thingStatus.createComponent(compFactory);
  }

  async onStatusChange(newStatus) {
    try {
      console.log(newStatus);
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
}
