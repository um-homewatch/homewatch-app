import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js"

@Component({
  selector: "page-new-scenario",
  templateUrl: "new.html",
})
export class NewScenarioPage {
  editMode: boolean = false;
  scenarioForm: FormGroup;
  homewatch: HomewatchApi;
  submitted: boolean = false;
  home: any;
  scenario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder, public events: Events) {
    this.homewatch = homewatchApi.getApi();

    this.scenarioForm = formBuilder.group({
      id: [""],
      name: ["", Validators.required]
    });
  }

  ionViewWillEnter() {
    this.home = this.navParams.get("home");
    this.scenario = this.navParams.get("scenario");
    if (this.scenario) {
      this.editMode = true;

      this.scenarioForm.setValue({
        id: this.scenario.id,
        name: this.scenario.name
      });
    }
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode) {
      let response = await this.homewatch.scenarios(this.home).updateScenario(form.value.id, form.value);
    } else {
      await this.homewatch.scenarios(this.home).createScenario(form.value);
    }
    this.navCtrl.pop();
  }
}
