import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HomewatchApi } from "homewatch-js";
import { Events, NavController, NavParams, PopoverController } from "ionic-angular";

import { ArraySorterHelper } from "../../../../helpers/array_sorter";
import { ThingsInfoHelper } from "../../../../helpers/things_info";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "new-triggered-task-page",
  templateUrl: "new.html"
})
export class NewTriggeredTaskPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  comparators: Array<string> = ["==", "<", ">", ">=", "<="];
  toApply = "thing";
  editMode = false;
  triggeredTaskForm: FormGroup;
  triggeredTask: any;
  homewatch: HomewatchApi;
  home: any;
  things: Array<any>;
  assignableThings: Array<any>;
  scenarios: Array<any>;
  thing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder, public popoverCtrl: PopoverController, public compFactoryResolver: ComponentFactoryResolver, public events: Events) {
    this.homewatch = homewatchApi.getApi();
    this.home = this.navParams.get("home");

    this.triggeredTaskForm = formBuilder.group({
      id: [""],
      thing_id: [""],
      status_to_apply: [""],
      scenario_id: [""],
      thing_to_compare_id: ["", Validators.required],
      comparator: ["", Validators.required],
      status_to_compare: ["", Validators.compose([Validators.required, this.JSONValidator])]
    });
  }

  async loadThingStatus(thing, status?) {
    this.thing = thing;
    this.events.subscribe(`thing:status:update:out${thing.id}`, newStatus => {
      this.onStatusToApplyChange(newStatus);
    });
    this.navParams.data.thing = thing;
    this.navParams.data.status = status;

    this.thingStatus.clear();
    const compFactory = this.compFactoryResolver.resolveComponentFactory(ThingsInfoHelper.getThingInfo(thing.type).showPage);
    this.thingStatus.createComponent(compFactory);
  }

  async loadThings() {
    const response = await this.homewatch.things(this.home).listThings();
    this.things = ArraySorterHelper.sortArrayByID(response.data);
    this.assignableThings = ArraySorterHelper.filterAssignableThings(this.things);
  }

  async loadScenarios() {
    const response = await this.homewatch.scenarios(this.home).listScenarios();
    this.scenarios = ArraySorterHelper.sortArrayByID(response.data);
  }

  async ionViewWillEnter() {
    this.triggeredTask = this.navParams.get("triggered_task");

    if (this.triggeredTask) {
      this.editMode = true;

      if (this.triggeredTask.thing) {
        this.toApply = "thing";
        this.triggeredTask.thing_id = this.triggeredTask.thing.id;
        this.loadThingStatus(this.triggeredTask.thing, this.triggeredTask.status_to_apply);
      } else {
        this.toApply = "scenario";
        this.triggeredTask.scenario_id = this.triggeredTask.scenario.id;
      }

      this.triggeredTask.status_to_compare = JSON.stringify(this.triggeredTask.status_to_compare);
      this.triggeredTask.thing_to_compare_id = this.triggeredTask.thing_to_compare.id;

      this.triggeredTaskForm.patchValue(this.triggeredTask);
      console.log(this.triggeredTaskForm)
    }

    await Promise.all([this.loadThings(), this.loadScenarios()]);
  }

  onStatusToApplyChange(status_to_apply) {
    this.triggeredTaskForm.patchValue({ status_to_apply });
  }

  onThingToApplyChange(thing) {
    this.loadThingStatus(thing);
  }

  onToApplyChange(toApply) {
    if (this.triggeredTaskForm.controls.scenario_id) this.triggeredTaskForm.controls.scenario_id.reset();
    if (this.triggeredTaskForm.controls.thing_id) this.triggeredTaskForm.controls.thing_id.reset();
    if (this.triggeredTaskForm.controls.status) this.triggeredTaskForm.controls.status.reset();

    this.toApply = toApply;
  }

  validForm() {
    return this.triggeredTaskForm.valid &&
      ((this.triggeredTaskForm.value.thing_id && this.triggeredTaskForm.value.status_to_apply) || this.triggeredTaskForm.value.scenario_id);
  }

  async onSubmit(form: FormGroup) {
    const triggered_task = this.buildTriggeredTask(form);

    if (this.editMode)
      await this.homewatch.triggeredTasks(this.home).updateTriggeredTask(form.value.id, triggered_task);
    else
      await this.homewatch.triggeredTasks(this.home).createTriggeredTask(triggered_task);

    this.navCtrl.pop();
  }

  private buildTriggeredTask(form: FormGroup) {
    try {
      const status_to_compare = JSON.parse(form.value.status_to_compare);

      const triggered_task = { status_to_apply: undefined, thing_id: undefined, scenario_id: undefined, thing_to_compare_id: form.value.thing_to_compare_id, status_to_compare, comparator: form.value.comparator.trim() };

      if (this.toApply === "thing") {
        triggered_task.thing_id = form.value.thing_id;
        triggered_task.status_to_apply = form.value.status_to_apply;
      } else if (this.toApply === "scenario") {
        triggered_task.scenario_id = form.value.scenario_id;
      }

      return triggered_task;
    } catch (e) { }
  }

  private JSONValidator = (control: FormControl) => {
    try {
      const json = control.value;
      if (json !== undefined) {
        JSON.parse(json);
      }
    } catch (e) {
      return { json: "invalid" };
    }

    return undefined;
  }
}
