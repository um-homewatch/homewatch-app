import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { ThingsInfo } from "../../../services/things_info";

@Component({
  selector: "page-new-thing",
  templateUrl: "new.html",
})
export class NewThingPage {
  editMode: boolean = false;
  thingForm: FormGroup;
  typeOptions: Array<Object>;
  subTypeOptions: Array<string> = [];
  homewatch: Homewatch;
  submitted: boolean = false;
  home: any;
  thing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, thingsInfo: ThingsInfo, public formBuilder: FormBuilder, public events: Events) {
    this.homewatch = homewatchApi.getApi();
    this.typeOptions = thingsInfo.getTypeOptions();

    this.thingForm = formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      type: ["", Validators.required],
      subtype: ["", Validators.required],
      connection_info: formBuilder.group({
        address: ["", Validators.required],
        port: [""]
      })
    });

    this.thingForm.valueChanges.subscribe(data => {
      if (data.type) this.subTypeOptions = thingsInfo.getThingInfo(data.type).subTypes;
    })
  }

  ionViewWillEnter() {
    this.home = this.navParams.get("home");
    this.thing = this.navParams.get("thing");
    if (this.thing) {
      this.editMode = true;

      this.thingForm.setValue({
        id: this.thing.id,
        name: this.thing.name,
        type: this.thing.type,
        subtype: this.thing.subtype,
        connection_info: {
          address: this.thing.connection_info.address,
          port: this.thing.connection_info.port || ""
        }
      });
    }
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode) {
      let response = await this.homewatch.things(this.home).updateThing(form.value.id, form.value);
      this.events.publish("things:updated", response.data);
    } else {
      await this.homewatch.things(this.home).createThing(form.value);
    }
    this.navCtrl.pop();
  }
}
