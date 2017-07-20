import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Storage } from "@ionic/storage";
import { HomewatchApi } from "homewatch-js";
import { Loading, LoadingController, Nav, Platform, ToastController } from "ionic-angular";

import { ListHomesPage } from "../pages/homes/list/list";
import { LoginPage } from "../pages/users/login/login";
import { EditProfilePage } from "../pages/users/sign-up/edit";
import { HomewatchApiService } from "../services/homewatch_api";

@Component({
  templateUrl: "app.html"
})
export class MyAppComponent {
  @ViewChild(Nav) nav: Nav;

  homewatch: HomewatchApi;
  rootPage: any = LoginPage;
  loading: Loading;

  pages: Array<{ title: string, component: any, icon: string, method: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, homewatchApiService: HomewatchApiService, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.homewatch = homewatchApiService.getApi();
    this.setInterceptors();
    this.initializeApp();

    this.pages = [
      { title: "Your Homes", component: ListHomesPage, icon: "home", method: "setRoot" },
      { title: "Profile", component: EditProfilePage, icon: "person", method: "push" },
      { title: "Logout", component: LoginPage, icon: "exit", method: "setRoot" }
    ];
  }

  setInterceptors() {
    this.homewatch.axios.interceptors.request.use(async config => {
      this.dismissLoadingSpinner();
      this.presentLoadingSpinner();

      return config;
    });

    this.homewatch.axios.interceptors.response.use(response => {
      this.dismissLoadingSpinner();

      return response;
    }, async error => {
      this.dismissLoadingSpinner();

      if (!error.response) {
        this.toastCtrl.create({ message: "Couldn't reach the servers!", showCloseButton: true, duration: 5000 }).present();
      } else if (error.response.status === 401) {
        await this.storage.remove("HOMEWATCH_USER");
        this.nav.setRoot(LoginPage);
        this.toastCtrl.create({ message: "Unauthorized access!", showCloseButton: true, duration: 5000 }).present();
      } else if (error.response.status === 500) {
        this.toastCtrl.create({ message: "Internal server error!", showCloseButton: true, duration: 5000 }).present();
      }

      return Promise.reject(error);
    });
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openPage(page) {
    // if logging out, clear user data
    if (page.component === LoginPage) {
      await this.storage.remove("HOMEWATCH_USER");
    }

    switch (page.method) {
      case "push":
        this.nav.push(page.component);
        break;
      case "setRoot":
        this.nav.setRoot(page.component);
        break;
    }
  }

  private presentLoadingSpinner() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.loading.present();
  }

  private dismissLoadingSpinner() {
    if (this.loading) this.loading.dismiss();
    this.loading = undefined;
  }
}
