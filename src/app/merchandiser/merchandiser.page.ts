import { Component, OnInit } from '@angular/core';
import { PageConfig } from 'src/models/app.models';

@Component({
  selector: 'adj-merchandiser',
  templateUrl: './merchandiser.page.html',
  styleUrls: ['./merchandiser.page.scss'],
})
export class MerchandiserPage implements OnInit {

  public config:PageConfig;
  constructor() { 
    this.config = { title: 'Merchandiser', subtitle: 'Snapshot of the Merchandiser for your Region' }
  }

  ngOnInit() {
  }

}
