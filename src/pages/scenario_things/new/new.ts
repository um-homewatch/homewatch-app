import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomewatchApi } from "homewatch-js";
import { Events, NavController, NavParams, PopoverController } from "ionic-angular";

import { ArraySorterHelper } from "../../../helpers/array_sorter";
import { ThingsInfoHelper } from "../../../helpers/things_info";
import { HomewatchApiService } from "../../../services/homewatch_api";

@Component({
  selector: "new-scenario-thing-page",
  templateUrl: "new.html"
})
export class NewScenarioThingPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  editMode = false;
  scenarioThingForm: FormGroup;
  scenarioThing: any;
  homewatch: HomewatchApi;
  scenario: any;
  home: any;
  selectedScenarioThings: Array<any>;
  things: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder, public popoverCtrl: PopoverController, public compFactoryResolver: ComponentFactoryResolver, public events: Events) {
    this.homewatch = homewatchApi.getApi();
    this.scenario = this.navParams.get("scenario");
    this.home = this.navParams.get("home");
    this.selectedScenarioThings = this.navParams.get("selectedThings");

    this.scenarioThingForm = formBuilder.group({
      id: [""],
      thing_id: ["", Validators.required],
      status: ["", Validators.required]
    });
  }

  async loadThingStatus(thing) {
    this.events.subscribe(`thing:status:update:out${thing.id}`, (status => { this.onStatusChange(status); }));
    this.navParams.data.thing = thing;
    if (this.editMode) this.navParams.data.status = this.scenarioThing.status;

    this.thingStatus.clear();
    const compFactory = this.compFactoryResolver.resolveComponentFactory(ThingsInfoHelper.getThingInfo(thing.type).showPage);
    this.thingStatus.createComponent(compFactory);
  }

  async loadThings() {
    const response = await this.homewatch.things(this.home).listThings();
    response.data = ArraySorterHelper.sortArrayByID(response.data);
    response.data = ArraySorterHelper.filterAssignableThings(response.data);
    response.data = this.filterBySelectedThings(response.data);
    this.things = response.data;
  }

  async ionViewWillEnter() {
    await this.loadThings();
    this.scenarioThing = this.navParams.get("scenarioThing");

    if (this.scenarioThing) {
      this.editMode = true;
      await this.loadThingStatus(this.scenarioThing.thing);

      this.scenarioThingForm.patchValue({
        id: this.scenarioThing.id,
        thing_id: this.scenarioThing.thing.id,
        status: this.scenarioThing.status
      });
    }
  }

  onStatusChange(status) {
    this.scenarioThingForm.patchValue({ status });
  }

  onThingChange(thing) {
    this.loadThingStatus(thing);
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode)
      await this.homewatch.scenarioThings(this.scenario).updateScenarioThing(form.value.id, { thing_id: form.value.thing_id, status: form.value.status });
    else
      await this.homewatch.scenarioThings(this.scenario).createScenarioThing({ thing_id: form.value.thing_id, status: form.value.status });
    this.navCtrl.pop();
  }

  private filterBySelectedThings(things: Array<any>) {
    return things.filter(el => this.findScenarioThingByThingID(el.id) === undefined);
  }

  private findScenarioThingByThingID(id: number) {
    return this.selectedScenarioThings.find(scenarioThing => scenarioThing.thing.id === id);
  }
}
