import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomewatchApiService } from '../../services/homewatch_api'
import { HomePage } from "../home/home"

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  name: string
  email: string
  password: string
  password_confirmation: string
  homewatch: Homewatch

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public storage: Storage) {
    this.homewatch = homewatchApi.getApi();
  }

  async signUp() {
    try {
      let user = { name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation }
      let response = await this.homewatch.users.register(user);
      this.homewatch.auth = response.data.jwt;
      this.storage.set("HOMEWATCH_USER", response.data);

      this.navCtrl.setRoot(HomePage, { user: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
