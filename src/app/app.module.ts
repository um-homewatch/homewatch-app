import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { LoginPage } from "../pages/users/login/login";
import { SignUpPage } from "../pages/users/sign-up/sign-up";
import { EditProfilePage } from "../pages/users/sign-up/edit";
import { ListHomesPage } from "../pages/homes/list/list";
import { NewHomePage } from "../pages/homes/new/new";
import { ShowHomePage } from "../pages/homes/show/show";
import { ShowHomePopoverPage } from "../pages/homes/show/popover";
import { NewThingPage } from "../pages/things/new/new";
import { ShowLightPage } from "../pages/things/light/show";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule } from "@ionic/storage";
import { HomewatchApiService } from "../services/homewatch_api";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowLightPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowLightPage
  ],
  providers: [
    HomewatchApiService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule { }
