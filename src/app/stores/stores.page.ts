import { Component, OnInit } from '@angular/core';
import { PageConfig } from 'src/models/app.models';
import { OrganisationService } from '../services/organisation/organisation.service';


@Component({
  selector: 'adj-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  public config: PageConfig;

  constructor(private orgService: OrganisationService) {
    this.config = { title: 'Stores', subtitle: 'Snapshot of the Stores for your Region' }
  }

  ngOnInit() {
    this.orgService.myIndex = ''
  }

}
