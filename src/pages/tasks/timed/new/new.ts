import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomewatchApi } from "homewatch-js";
import { Events, NavController, NavParams, PopoverController } from "ionic-angular";

import { ArraySorterHelper } from "../../../../helpers/array_sorter";
import { ThingsInfoHelper } from "../../../../helpers/things_info";
import { HomewatchApiService } from "../../../../services/homewatch_api";

@Component({
  selector: "new-timed-task-page",
  templateUrl: "new.html"
})
export class NewTimedTaskPage {
  @ViewChild("thingStatus", { read: ViewContainerRef }) thingStatus: ViewContainerRef;
  toApply = "thing";
  editMode = false;
  timedTaskForm: FormGroup;
  timedTask: any;
  homewatch: HomewatchApi;
  home: any;
  things: Array<any>;
  assignableThings: Array<any>;
  scenarios: Array<any>;
  thing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder, public popoverCtrl: PopoverController, public compFactoryResolver: ComponentFactoryResolver, public events: Events) {
    this.homewatch = homewatchApi.getApi();
    this.home = this.navParams.get("home");

    this.timedTaskForm = formBuilder.group({
      id: [""],
      thing_id: [""],
      scenario_id: [""],
      status: [""],
      cron: ["", Validators.required]
    });
  }

  async loadThingStatus(thing) {
    this.thing = thing;
    this.events.subscribe(`thing:status:update:out${thing.id}`, status => { this.onStatusChange(status); });
    this.navParams.data.thing = thing;
    if (this.editMode) this.navParams.data.status = this.timedTask.status;

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
    this.timedTask = this.navParams.get("timed_task");

    if (this.timedTask) {
      this.editMode = true;

      if (this.timedTask.thing) {
        this.toApply = "thing";
        this.timedTask.thing_id = this.timedTask.thing.id;
        this.loadThingStatus(this.timedTask.thing);
      } else {
        this.toApply = "scenario";
        this.timedTask.scenario_id = this.timedTask.scenario.id;
      }

      this.timedTaskForm.patchValue(this.timedTask);
    }

    this.timedTaskForm.get("thing_id").valueChanges.subscribe(thing_id => {
      const thing = this.things.find(t => t.id === thing_id);
      if (thing) this.loadThingStatus(thing);
    });

    await Promise.all([this.loadThings(), this.loadScenarios()]);
  }

  onStatusChange(status) {
    this.timedTaskForm.patchValue({ status });
  }

  onToApplyChange(toApply) {
    if (this.timedTaskForm.controls.scenario_id) this.timedTaskForm.controls.scenario_id.reset();
    if (this.timedTaskForm.controls.thing_id) this.timedTaskForm.controls.thing_id.reset();
    if (this.timedTaskForm.controls.status) this.timedTaskForm.controls.status.reset();

    this.toApply = toApply;
  }

  validForm() {
    return this.timedTaskForm.valid &&
      ((this.timedTaskForm.value.thing_id && this.timedTaskForm.value.status) || this.timedTaskForm.value.scenario_id);
  }

  async onSubmit(form: FormGroup) {
    const timed_task = this.buildTimedTask(form);

    if (this.editMode)
      await this.homewatch.timedTasks(this.home).updateTimedTask(form.value.id, timed_task);
    else
      await this.homewatch.timedTasks(this.home).createTimedTask(timed_task);

    this.navCtrl.pop();
  }

  private buildTimedTask(form: FormGroup) {
    const timed_task = { cron: form.value.cron, status: undefined, thing_id: undefined, scenario_id: undefined };

    if (this.toApply === "thing") {
      timed_task.thing_id = form.value.thing_id;
      timed_task.status = form.value.status;
    } else if (this.toApply === "scenario") {
      timed_task.scenario_id = form.value.scenario_id;
    }

    return timed_task;
  }
}
