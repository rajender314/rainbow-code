import { Component, OnInit } from '@angular/core';
import { PageConfig } from 'src/models/app.models';

@Component({
  selector: 'adj-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

  public config: PageConfig;
  constructor() {
    this.config = { title: 'Visits', subtitle: 'Snapshot of the Visits for your Region' }
   }

  ngOnInit() {
  }

}
