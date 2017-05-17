import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

@Component({
  selector: "new-home-page",
  templateUrl: "new.html",
})
export class NewHomePage {
  editMode: boolean = false;
  homeForm: FormGroup;
  homewatch: Homewatch;
  submitted: boolean = false;
  home: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder) {
    this.homewatch = homewatchApi.getApi();

    this.homeForm = formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      location: ["", Validators.required],
      tunnel: ["", Validators.compose([Validators.required, Validators.pattern(URL_REGEX)])]
    });
  }

  ionViewWillEnter() {
    this.home = this.navParams.get("home");
    if (this.home) {
      this.editMode = true;

      this.homeForm.setValue({
        id: this.home.id,
        name: this.home.name,
        location: this.home.location,
        tunnel: this.home.tunnel
      });
    }
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode)
      await this.homewatch.homes.updateHome(form.value.id, form.value);
    else
      await this.homewatch.homes.createHome(form.value);
    this.navCtrl.pop();
  }
}
