import { Component, OnInit } from '@angular/core';
import { PageConfig } from 'src/models/app.models';

@Component({
  selector: 'adj-beats',
  templateUrl: './beats.page.html',
  styleUrls: ['./beats.page.scss'],
})
export class BeatsPage implements OnInit {

  public config: PageConfig;
  constructor() {
    this.config = { title: 'Beats', subtitle: 'Snapshot of the Beats for your Region' }
   }

  ngOnInit() {
  }

}
