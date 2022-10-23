import { PageConfig } from './../../models/app.models';
import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../services/organisation/organisation.service';

@Component({
  selector: 'adj-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  public config: PageConfig;
  constructor(private orgService: OrganisationService) {
    this.config = { title: 'Reports', subtitle: '' }
  }
  ngOnInit() {
    this.orgService.myIndex = ''
  }

}
