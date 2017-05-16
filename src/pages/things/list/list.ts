import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomewatchApiService } from '../../../services/homewatch_api';
import { NewThingPage } from '../new/new';

@Component({
  selector: 'page-list-things',
  templateUrl: 'list.html',
})
export class ListThingsPage {
  homewatch: Homewatch;
  home: any;
  things: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApiService: HomewatchApiService) {
    this.homewatch = homewatchApiService.getApi();
    this.home = this.navParams.get('home');
  }

  async ionViewWillEnter() {
    let response = await this.homewatch.things(this.home).listThings();
    this.things = response.data;
  }

  editThing(thing: any) {
    this.navCtrl.push(NewThingPage, { home: this.home, thing });
  }

  newThing() {
    this.navCtrl.push(NewThingPage, { home: this.home });
  }

  getIconFromType(type: string) {
    switch (type) {
      case 'Things::Light':
        return 'bulb';
      case 'Things::Lock':
        return 'lock';
      case 'Things::Thermostat':
        return 'thermometer';
      case 'Things::Weather':
        return 'sunny';
      default:
        return 'help';
    }
  }
}
