import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class ThingStatusService {
  public statusAnnounced$: Observable<Object>;
  private statusAnnouncedSource = new Subject<Object>();

  constructor() {
    this.statusAnnounced$ = this.statusAnnouncedSource.asObservable();
  }

  announceStatus(status) {
    this.statusAnnouncedSource.next(status);
  }
}
