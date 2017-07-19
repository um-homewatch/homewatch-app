import { Component, Input } from "@angular/core";

@Component({
  selector: "thing-status",
  template: `
    <div *ngFor="let key of statusKeys(status)">
      <p class="capitalize inline">{{key}}: </p>
      <p class="capitalize inline">{{status[key]}}</p>
    </div>
  `
})
export class ThingStatusComponent {
  @Input() status: Object;

  statusKeys(status: Object) {
    return Object.keys(status);
  }
}
