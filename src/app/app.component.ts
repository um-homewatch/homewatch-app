import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomewatchApiService } from '../services/homewatch_api'

import { ListHomesPage } from '../pages/homes/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [HomewatchApiService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: ListHomesPage, icon: "home" },
      { title: 'Logout', component: LoginPage, icon: "exit" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openPage(page) {
    //if logging out, clear user data
    if (page.component == LoginPage){
      console.log("meme")
      await this.storage.remove("HOMEWATCH_USER");
    }
    this.nav.setRoot(page.component);
  }
}
