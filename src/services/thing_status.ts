import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ThingStatusService {
  private statusAnnouncedSource = new Subject<any>();

  statusAnnounced$ = this.statusAnnouncedSource.asObservable();

  announceStatus(status) {
    this.statusAnnouncedSource.next(status);
  }
}
