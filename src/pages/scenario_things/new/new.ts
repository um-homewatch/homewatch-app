import { Component, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, PopoverController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { Subscription } from "rxjs";
import { ThingStatusService } from "../../../services/thing_status";
import { ThingsInfo } from "../../../services/things_info";

@Component({
  selector: "new-scenario-thing-page",
  templateUrl: "new.html",
})
export class NewScenarioThingPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  editMode: boolean = false;
  scenarioThingForm: FormGroup;
  scenarioThing: any;
  homewatch: Homewatch;
  scenario: any;
  home: any;
  things: Array<any>;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder, public popoverCtrl: PopoverController, public thingStatusService: ThingStatusService, public compFactoryResolver: ComponentFactoryResolver, public thingsInfo: ThingsInfo) {
    this.homewatch = homewatchApi.getApi();
    this.scenario = this.navParams.get("scenario");
    this.home = this.navParams.get("home");

    this.scenarioThingForm = formBuilder.group({
      id: [""],
      thing: ["", Validators.required],
      status: ["", Validators.required]
    });

    this.scenarioThingForm.get("thing").valueChanges.subscribe((thing) => this.loadThingStatus(thing));
  }

  async loadThingStatus(thing) {
    this.thingStatus.clear();
    let compFactory = this.compFactoryResolver.resolveComponentFactory(this.thingsInfo.getThingInfo(thing.type).showPage);
    this.thingStatus.createComponent(compFactory);
  }

  async loadThings() {
    let response = await this.homewatch.things(this.home).listThings();
    this.things = response.data;
  }

  async ionViewWillEnter() {
    await this.loadThings();
    this.subscription = this.thingStatusService.statusAnnounced$.subscribe(status => { this.onStatusChange(status); });

    this.scenarioThing = this.navParams.get("scenarioThing");
    if (this.scenarioThing) {
      this.editMode = true;
      await this.loadThingStatus(this.scenarioThing.thing);

      this.scenarioThingForm.setValue({
        id: this.scenarioThing.id,
        thing: this.scenarioThing.thing,
        status: this.scenarioThing.status,
      });
    }
  }

  onStatusChange(status) {
    this.scenarioThingForm.patchValue({ status: status });
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode)
      await this.homewatch.scenarioThings(this.scenario).updateScenarioThing(form.value.id, { thing_id: form.value.thing.id, status: form.value.status });
    else
      await this.homewatch.scenarioThings(this.scenario).createScenarioThing({ thing_id: form.value.thing.id, status: form.value.status });
    this.navCtrl.pop();
  }
}
