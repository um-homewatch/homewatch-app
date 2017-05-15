import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list-things',
  templateUrl: 'list.html',
})
export class ListThingsPage {
  home: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.home = this.navParams.get("home");
  }

  ionViewWillEnter() {
  }
}
