import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HomewatchApiService } from '../../services/homewatch_api'
import { HomesListPage } from "../homes/list/list"

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpForm: FormGroup
  homewatch: Homewatch
  submitted: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage, public formBuilder: FormBuilder) {
    this.homewatch = homewatchApi.getApi();

    this.signUpForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.pattern(EMAIL_REGEX), Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.compose([])]
    }, { validator: this.equalValueValidator("password", "password_confirmation") });
  }

  async signUp() {
    this.submitted = true;
    console.log(this.signUpForm)
    if (this.signUpForm.valid) {
      try {
        console.log(this.signUpForm)
        let user = this.signUpForm.value;
        let response = await this.homewatch.users.register(user);
        this.homewatch.auth = response.data.jwt;
        this.storage.set("HOMEWATCH_USER", response.data);

        this.navCtrl.setRoot(HomesListPage, { user: response.data });
      } catch (error) {
        alert("Mail already in use!");
        console.error(error);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  equalValueValidator(targetKey: string, toMatchKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      if (target.touched && toMatch.touched) {
        const isMatch = target.value === toMatch.value;
        // set equal value error on dirty controls
        if (!isMatch && target.valid && toMatch.valid) {
          toMatch.setErrors({ equalValue: targetKey });
          const message = targetKey + ' != ' + toMatchKey;
          return { 'equalValue': message };
        }
        if (isMatch && toMatch.hasError('equalValue')) {
          toMatch.setErrors(null);
        }
      }

      return null;
    };
  }
}
