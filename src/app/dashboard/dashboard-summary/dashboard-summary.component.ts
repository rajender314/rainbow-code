import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { BodyComponent } from 'src/app/commons/body/body.component';
import { KPICardComponent } from 'src/app/commons/kpicard/kpicard.component';
import { DateFunction, DateUtil } from 'src/app/commons/models/date.models';
import { KPIDescriptor } from 'src/app/commons/models/kpi.card.options';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { KPIRegistryService } from 'src/app/services/kpi/kpiregistry.service';
import { Option } from '../../commons/models/common.models';
import { apiDirectory } from '../../../global';
import { mapOf } from '../../utils/utils-function';

@Component({
  selector: 'adj-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss'],
})
export class DashboardSummaryComponent implements OnInit {

  public kpis: Array<KPIDescriptor>;

  @ViewChildren(KPICardComponent)
  private kpiCards: Array<KPICardComponent>;

  @ViewChild(BodyComponent)
  private body: BodyComponent;

  @Input('date-function')
  public dateFunction: DateFunction;

  @Output('date-change')
  private dateChange: EventEmitter<DateFunction> = new EventEmitter<DateFunction>();
  public subscription: Subscription;

  
  constructor(private baseAPI: BaseAPI,     protected popover: PopoverService,
    private uiProvider: PopoverService, private kpiRegistry: KPIRegistryService) {
    this.dateFunction = DateUtil.CURRENT_MONTH;
    this.kpis = new Array<KPIDescriptor>();
    this.kpis.push(this.kpiRegistry.getKPI('nrv'));
    // this.kpis.push(this.kpiRegistry.getKPI('skuCount'));
    this.kpis.push(this.kpiRegistry.getKPI('orders'));
    this.kpis.push(this.kpiRegistry.getKPI('stores'));

    console.log(this.kpis, this.dateFunction.start())

   }

  ngOnInit() {
  }

  public showDateOptions(event: Event): void {
    console.log(11)
    this.popover.showDateOptions({
      event: event,
      selectHandler: (response: Option<any>) => {
        this.dateFunction = (response.value) ? response.value.dateFunction : this.dateFunction;
        // this.refresh();
      }
    }, this.dateFunction)
  }

  


}
