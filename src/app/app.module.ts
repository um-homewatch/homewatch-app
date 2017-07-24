import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { CloudModule } from "@ionic/cloud-angular";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { ThingNameComponent } from "../components/thing-name/thing-name";
import { ThingStatusComponent } from "../components/thing-status/thing-status";
import { ListHomesPage } from "../pages/homes/list/list";
import { NewHomePage } from "../pages/homes/new/new";
import { NewHomePopoverPage } from "../pages/homes/new/popover";
import { ShowHomePopoverPage } from "../pages/homes/show/popover";
import { ShowHomePage } from "../pages/homes/show/show";
import { HomeTabsPage } from "../pages/homes/tabs/tabs";
import { NewScenarioThingPage } from "../pages/scenario_things/new/new";
import { ListScenariosPage } from "../pages/scenarios/list/list";
import { NewScenarioPage } from "../pages/scenarios/new/new";
import { ShowScenarioPopoverPage } from "../pages/scenarios/show/popover";
import { ShowScenarioPage } from "../pages/scenarios/show/show";
import { ListTasksPage } from "../pages/tasks/list/list";
import { ListTimedTasksPage } from "../pages/tasks/timed/list/list";
import { NewTimedTaskPage } from "../pages/tasks/timed/new/new";
import { ListTriggeredTasksPage } from "../pages/tasks/triggered/list/list";
import { NewTriggeredTaskPage } from "../pages/tasks/triggered/new/new";
import { ShowLightPage } from "../pages/things/devices/light/show";
import { ShowLockPage } from "../pages/things/devices/lock/show";
import { ShowMotionSensorPage } from "../pages/things/devices/motion_sensor/show";
import { ShowThermostatPage } from "../pages/things/devices/thermostat/show";
import { ShowWeatherPage } from "../pages/things/devices/weather/show";
import { NewThingPage } from "../pages/things/new/new";
import { ShowThingPopoverPage } from "../pages/things/show/popover";
import { ShowThingPage } from "../pages/things/show/show";
import { LoginPage } from "../pages/users/login/login";
import { EditProfilePage } from "../pages/users/sign-up/edit";
import { SignUpPage } from "../pages/users/sign-up/sign-up";
import { HomewatchApiService } from "../services/homewatch_api";
import { MyAppComponent } from "./app.component";

const cloudSettings: any = {
  core: {
    app_id: "b14588ff"
  }
};

@NgModule({
  declarations: [
    MyAppComponent,
    ThingStatusComponent,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    NewHomePopoverPage,
    HomeTabsPage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowThingPage,
    ShowThingPopoverPage,
    ShowLightPage,
    ShowLockPage,
    ShowThermostatPage,
    ShowWeatherPage,
    ShowMotionSensorPage,
    ListScenariosPage,
    NewScenarioPage,
    ShowScenarioPage,
    ShowScenarioPopoverPage,
    NewScenarioThingPage,
    ListTasksPage,
    ListTimedTasksPage,
    NewTimedTaskPage,
    ListTriggeredTasksPage,
    ThingNameComponent,
    NewTriggeredTaskPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyAppComponent),
    IonicStorageModule.forRoot({
      name: "__homewatchdb",
      driverOrder: ["sqlite", "indexeddb", "websql"]
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    ThingStatusComponent,
    LoginPage,
    SignUpPage,
    ListHomesPage,
    NewHomePage,
    NewHomePopoverPage,
    HomeTabsPage,
    ShowHomePage,
    ShowHomePopoverPage,
    NewThingPage,
    EditProfilePage,
    ShowThingPage,
    ShowThingPopoverPage,
    ShowLightPage,
    ShowLockPage,
    ShowThermostatPage,
    ShowWeatherPage,
    ShowMotionSensorPage,
    ListScenariosPage,
    NewScenarioPage,
    ShowScenarioPage,
    ShowScenarioPopoverPage,
    NewScenarioThingPage,
    ListTasksPage,
    ListTimedTasksPage,
    NewTimedTaskPage,
    ListTriggeredTasksPage,
    NewTriggeredTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HomewatchApiService
  ]
})

export class AppModule { }
