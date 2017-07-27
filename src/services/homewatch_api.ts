import { Injectable } from "@angular/core";
import { HomewatchApi } from "homewatch-js";

@Injectable()
export class HomewatchApiService {
  homewatch: HomewatchApi;
  auth: string;
  requestInterceptor: any;
  responseInterceptor: any;

  constructor() {
    this.homewatch = new HomewatchApi("https://homewatch-api.herokuapp.com", false);
  }

  getApi(): HomewatchApi {
    return this.homewatch;
  }

  getCleanApi(): HomewatchApi {
    const api = new HomewatchApi("https://homewatch-api.herokuapp.com", false);
    api.auth = this.auth;
    api.axios.interceptors.request.eject(this.requestInterceptor);
    api.axios.interceptors.response.eject(this.responseInterceptor);

    return api;
  }

  setAuth(auth: string) {
    this.homewatch.auth = auth;
    this.auth = auth;
  }

  registerRequestInterceptors(interceptor: Function, errorInterceptor?: Function): void {
    this.requestInterceptor = this.homewatch.axios.interceptors.request.use(interceptor, errorInterceptor);
  }

  registerResponseInterceptors(interceptor: Function, errorInterceptor?: Function): void {
    this.responseInterceptor = this.homewatch.axios.interceptors.response.use(interceptor, errorInterceptor);
  }
}
