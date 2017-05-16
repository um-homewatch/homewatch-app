import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HomewatchApiService } from '../../../services/homewatch_api';

@Component({
  selector: 'page-new-thing',
  templateUrl: 'new.html',
})
export class NewThingPage {
  editMode: boolean = false;
  thingForm: FormGroup;
  typeOptions: any = [
    { value: 'Things::Light', text: 'Light', icon: 'bulb' },
    { value: 'Things::Lock', text: 'Lock', icon: 'lock' },
    { value: 'Things::Thermostat', text: 'Thermostat', icon: 'thermometer' },
    { value: 'Things::Weather', text: 'Weather', icon: 'sunny' },
  ];
  homewatch: Homewatch;
  submitted: boolean = false;
  home: any;
  thing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, homewatchApi: HomewatchApiService, public formBuilder: FormBuilder) {
    this.homewatch = homewatchApi.getApi();

    this.thingForm = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      subtype: ['', Validators.required],
      connection_info: [{ address: '192.168.1.200' }]
    });
  }

  ionViewWillEnter() {
    this.home = this.navParams.get('home');
    this.thing = this.navParams.get('thing');
    if (this.thing) {
      this.editMode = true;

      this.thingForm.setValue({
        id: this.thing.id,
        name: this.thing.name,
        type: this.thing.type,
        subtype: this.thing.subtype,
        connection_info: { address: '192.168.1.200' }
      });
    }
  }

  async onSubmit(form: FormGroup) {
    if (this.editMode)
      await this.homewatch.things(this.home).updateThing(form.value.id, form.value);
    else
      await this.homewatch.things(this.home).createThing(form.value);
    this.navCtrl.pop();
  }
}
