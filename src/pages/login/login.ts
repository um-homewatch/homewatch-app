import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomewatchApiService } from '../../services/homewatch_api'
import { HomePage } from "../home/home"
import { SignUpPage } from "../sign-up/sign-up"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string
  password: string
  homewatch: Homewatch

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage) {
    this.homewatch = homewatchApi.getApi();
  }

  async ionViewDidLoad() {
    let user = await this.storage.get("HOMEWATCH_USER");
    if (user) {
      this.homewatch.auth = user.jwt;

      this.navCtrl.setRoot(HomePage, { user });
    }

    console.log('ionViewDidLoad LoginPage');
  }

  async clicked() {
    try {
      console.log(`${this.email} ${this.password}`);
      let auth = { email: this.email, password: this.password }
      let response = await this.homewatch.users.login(auth);
      let user = response.data;
      this.homewatch.auth = user.jwt;
      this.storage.set("HOMEWATCH_USER", user);

      this.navCtrl.setRoot(HomePage, { user });
    } catch (error) {
      console.error(error);
    }
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }
}
