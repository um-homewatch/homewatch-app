import { HomewatchApiService } from "./homewatch_api";
import { Injectable } from "@angular/core";
import * as ActionCable from "actioncable";

@Injectable()
export class HomewatchSockets {
  cable: ActionCable.Cable;
  thingChannel: ActionCable.Channel;

  constructor(public homewatchApiService: HomewatchApiService) { }

  subscribeToThing(thing: any, thingStatusCallback: Function) {
    this.cable = ActionCable.createConsumer(`${HomewatchApiService.url}/cable?token=${this.homewatchApiService.auth}`);
    const channelParams = { channel: "ThingStatusChannel", data: { thing_id: thing.id } };

    this.thingChannel = this.cable.subscriptions.create(channelParams, {
      connected(): void {
        // do nothing
      },
      disconnected(): void {
        // do nothing
      },
      received(message): void {
        thingStatusCallback(message);
      }
    });
  }

  removeSubscription() {
    this.thingChannel.unsubscribe();
  }

  requestThingUpdate(thing: any) {
    this.thingChannel.perform("fetch_status", { thing_id: thing.id });
  }
}
