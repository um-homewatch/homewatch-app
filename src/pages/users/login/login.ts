import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { HomewatchApiService } from "../../../services/homewatch_api";
import { ListHomesPage } from "../../homes/list/list";
import { SignUpPage } from "../sign-up/sign-up"

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  homewatch: Homewatch;
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage, public formBuilder: FormBuilder, public toastController: ToastController) {
    this.homewatch = homewatchApi.getApi();

    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required])],
      password: ["", Validators.required]
    });
  }

  async ionViewDidLoad() {
    let user = await this.storage.get("HOMEWATCH_USER");
    if (user) {
      this.homewatch.auth = user.jwt;
      this.navCtrl.setRoot(ListHomesPage, { user });
    }
  }

  async onSubmit(form: FormGroup) {
    try {
      this.submitted = true;
      let response = await this.homewatch.users.login(form.value);
      this.homewatch.auth = response.data.jwt;
      this.storage.set("HOMEWATCH_USER", response.data);
      this.navCtrl.setRoot(ListHomesPage, { user: response.data });
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        this.toastController
          .create({ showCloseButton: true, message: "Email and password combination not found!" })
          .present();
      }
    }
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }
}
