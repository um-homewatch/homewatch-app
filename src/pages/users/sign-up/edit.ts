import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { HomewatchApi } from "homewatch-js";
import { NavController, NavParams } from "ionic-angular";

import { HomewatchApiService } from "../../../services/homewatch_api";
import { ListHomesPage } from "../../homes/list/list";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: "page-profile",
  templateUrl: "sign-up.html"
})
export class EditProfilePage {
  pageTitle = "Profile";
  editMode = true;
  signUpForm: FormGroup;
  homewatch: HomewatchApi;
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage, public formBuilder: FormBuilder) {
    this.homewatch = homewatchApi.getApi();

    this.signUpForm = formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required])],
      passwords: formBuilder.group({
        password: [""],
        password_confirmation: [""]
      }, { validator: this.matchPassword })
    });
  }

  async ionViewWillEnter() {
    const user = await this.storage.get("HOMEWATCH_USER");
    this.signUpForm.setValue({
      name: user.name,
      email: user.email,
      passwords: {
        password: "",
        password_confirmation: ""
      }
    });
  }

  async onSubmit(form: FormGroup) {
    this.submitted = true;
    try {
      const user = this.convertFormToUser(form);
      const response = await this.homewatch.users.updateCurrentUser(user);
      this.homewatch.auth = response.data.jwt;
      this.storage.set("HOMEWATCH_USER", response.data);

      this.navCtrl.setRoot(ListHomesPage, { user: response.data });
    } catch (error) {
      alert("Mail already in use!");
      console.error(error);
    }
  }

  private convertFormToUser = (form: FormGroup) => {
    return {
      name: form.value.name,
      email: form.value.email,
      password: form.value.passwords.password,
      password_confirmation: form.value.passwords.password_confirmation
    };
  }

  private matchPassword = (group: FormGroup) => {
    const password = group.controls.password;
    const confirm = group.controls.password_confirmation;

    if (password.pristine || confirm.pristine) {
      return undefined;
    }

    group.markAsTouched();

    if (password.value === confirm.value) {
      return undefined;
    }

    return {
      isValid: false
    };
  }
}
