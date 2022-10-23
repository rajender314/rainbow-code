import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageConfig } from 'src/models/app.models';

@Component({
  selector: 'adj-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  public config: PageConfig;
  public defaultSegment: string;
  public activeSegment: string;
  constructor() { 
    this.config = { title: 'Maintenance', subtitle: 'Snapshot of the Activity for your Region' }
    this.activeSegment = this.defaultSegment = 'visit-compliance';
  }

  ngOnInit() {
  }

  public handleSegmentChange(event: any): void {
    this.activeSegment = event!.detail!.value;
  }
}
