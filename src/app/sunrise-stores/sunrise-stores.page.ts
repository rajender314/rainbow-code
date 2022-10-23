import { Component, OnInit } from '@angular/core';
import { PageConfig } from 'src/models/app.models';


@Component({
  selector: 'adj-sunrise-stores',
  templateUrl: './sunrise-stores.page.html',
  styleUrls: ['./sunrise-stores.page.scss'],
})
export class SunriseStoresPage implements OnInit {
  
  public config: PageConfig;
  
  constructor() {
    this.config = { title: 'Stores', subtitle: 'Snapshot of the Stores for your Region' }
   }

  ngOnInit() {
  }

}
