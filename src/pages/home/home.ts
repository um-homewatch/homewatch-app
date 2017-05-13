import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomewatchApiService} from "../../services/homewatch_api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homewatch: Homewatch
  user: Object
  homes: Array<Object>
  loading = true

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
  }

  async ionViewDidLoad() {
    this.user = this.navParams.get("user")
    let response = await this.homewatch.homes.listHomes()
    this.homes = response.data
    this.loading = false
  }
}
