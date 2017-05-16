import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomewatchApiService } from '../services/homewatch_api';
import { EditProfilePage } from '../pages/sign-up/edit';

import { ListHomesPage } from '../pages/homes/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [HomewatchApiService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string, method: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();

    this.pages = [
      { title: 'Your Homes', component: ListHomesPage, icon: 'home', method: 'setRoot' },
      { title: 'Profile', component: EditProfilePage, icon: 'person', method: 'push' },
      { title: 'Logout', component: LoginPage, icon: 'exit', method: 'setRoot' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openPage(page) {
    //if logging out, clear user data
    if (page.component === LoginPage) {
      console.log('meme');
      await this.storage.remove('HOMEWATCH_USER');
    }

    switch (page.method) {
      case 'push':
        this.nav.push(page.component);
        break;
      case 'setRoot':
        this.nav.setRoot(page.component);
        break;
    }
  }
}
