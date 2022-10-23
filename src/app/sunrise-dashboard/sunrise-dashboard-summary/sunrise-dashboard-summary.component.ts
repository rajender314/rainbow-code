import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { BodyComponent } from 'src/app/commons/body/body.component';
import { KPICardComponent } from 'src/app/commons/kpicard/kpicard.component';
import { DateFunction, DateUtil } from 'src/app/commons/models/date.models';
import { KPIDescriptor } from 'src/app/commons/models/kpi.card.options';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { KPIRegistryService } from 'src/app/services/kpi/kpiregistry.service';
import { Option } from '../../commons/models/common.models';

@Component({
  selector: 'adj-sunrise-dashboard-summary',
  templateUrl: './sunrise-dashboard-summary.component.html',
  styleUrls: ['./sunrise-dashboard-summary.component.scss'],
})
export class SunriseDashboardSummaryComponent implements OnInit {

  public kpis: Array<KPIDescriptor>;

  @ViewChildren(KPICardComponent)
  private kpiCards: Array<KPICardComponent>;

  @ViewChild(BodyComponent)
  private body: BodyComponent;

  @Input('date-function')
  public dateFunction: DateFunction;

  @Output('date-change')
  private dateChange: EventEmitter<DateFunction> = new EventEmitter<DateFunction>();

  
  constructor(private baseAPI: BaseAPI, private uiProvider: PopoverService, private kpiRegistry: KPIRegistryService) {
    this.dateFunction = DateUtil.CURRENT_MONTH;
    this.kpis = new Array<KPIDescriptor>();
    this.kpis.push(this.kpiRegistry.getKPI('nrv'));
    this.kpis.push(this.kpiRegistry.getKPI('skuCount'));
    this.kpis.push(this.kpiRegistry.getKPI('orders'));
    this.kpis.push(this.kpiRegistry.getKPI('stores'));

    
   }

  ngOnInit() {}



}
