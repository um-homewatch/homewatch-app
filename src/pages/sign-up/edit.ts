import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, NavParams } from "ionic-angular";
import { HomewatchApiService } from "../../services/homewatch_api";
import { ListHomesPage } from "../homes/list/list";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: "page-profile",
  templateUrl: "sign-up.html",
})
export class EditProfilePage {
  pageTitle: string = "Profile";
  editMode: boolean = true;
  signUpForm: FormGroup;
  homewatch: Homewatch;
  submitted: boolean = false;

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
    let user = await this.storage.get("HOMEWATCH_USER");
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
      let user = this.convertFormToUser(this.signUpForm);
      let response = await this.homewatch.users.updateCurrentUser(user);
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

    // Don't kick in until user touches both fields
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
