import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { HomewatchApi } from "homewatch-js";
import { ListHomesPage } from "../../homes/list/list";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html",
})
export class SignUpPage {
  pageTitle: string = "Sign Up";
  signUpForm: FormGroup;
  homewatch: HomewatchApi;
  submitted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage, public formBuilder: FormBuilder) {
    this.homewatch = homewatchApi.getApi();

    this.signUpForm = formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required])],
      passwords: formBuilder.group({
        password: ["", Validators.required],
        password_confirmation: ["", Validators.required]
      }, { validator: this.matchPassword })
    });
  }

  async onSubmit(form: FormGroup) {
    this.submitted = true;
    try {
      let user = this.convertFormToUser(this.signUpForm);
      let response = await this.homewatch.users.register(user);
      this.homewatch.auth = response.data.jwt;
      this.storage.set("HOMEWATCH_USER", response.data);

      this.navCtrl.setRoot(ListHomesPage, { user: response.data });
    } catch (error) {
      alert("Mail already in use!");
      console.error(error);
    }
  }

  private convertFormToUser(form: FormGroup) {
    return {
      name: form.value.name,
      email: form.value.email,
      password: form.value.passwords.password,
      password_confirmation: form.value.passwords.password_confirmation
    };
  }

  private matchPassword(group): any {
    let password = group.controls.password;
    let confirm = group.controls.password_confirmation;

    if (password.pristine || confirm.pristine) {
      return null;
    }

    group.markAsTouched();

    if (password.value === confirm.value) {
      return null;
    }

    return {
      isValid: false
    };
  }
}
