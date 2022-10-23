import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BaseAPI } from 'src/app/services/api/base.api';
// import { OrganisationService } from 'src/app/services/organisation/organisation.service';
import { FROM_DATE, TO_DATE } from 'src/constants';
import { UserSettings } from 'src/models/app.models';
import { BodyComponent } from '../body/body.component';
import { Option, PaginatedResponse } from '../models/common.models';
import { DateFunction } from '../models/date.models';
import { PageComponent } from '../page/page.component';
import { PaginatedListComponent, PaginatedListConfig } from '../paginated-list/paginated-list.component';
import { ModalService } from '../services/modal-provider.service';
import { PopoverService } from '../services/popover.service';
import { SortProviderService } from '../services/sort.provider.service';

@UntilDestroy()
@Component({
  selector: 'adj-generic-list-component',
  templateUrl: './generic-list-component.component.html',
  styleUrls: ['./generic-list-component.component.scss'],
})
export abstract class GenericListComponentComponent<T> implements OnInit {

  @ViewChild(PaginatedListComponent)
  protected paginatedList: PaginatedListComponent
  public totalRecords: number;
  public dateFunction: DateFunction;
  public storeRaType: any;
  public paginatedListConfig: PaginatedListConfig;
  public settings: UserSettings;

  constructor(
    @Optional() protected page: PageComponent,
    protected alertController: AlertController,
    protected baseAPI: BaseAPI,
    public modalService: ModalService,
    // protected orgService: OrganisationService,
    protected popover: PopoverService,
    public uiProvider: PopoverService,
    public sortProvider: SortProviderService,

  ) { }

  ngOnInit() {
    this.paginatedListConfig = this.getListConfig();
    // this.popover.userSettings.settings.pipe(untilDestroyed(this)).subscribe(settings => {
    //   this.settings = settings;
    // })
  }

  public showDateOptions(event: Event): void {
    this.popover.showDateOptions({
      event: event,
      selectHandler: (response: Option<any>) => {
        this.dateFunction = (response.value) ? response.value.dateFunction : this.dateFunction;
        this.refresh();
      }
    }, this.dateFunction)
  }
  public storeSunriseType(event) {
    console.log(event)
    this.storeRaType = event.detail.checked ? '0' : '1';
    this.refresh();
  }

  ngAfterViewInit(): void {
    this.refresh();
    // setTimeout(() => {
    //   if (this.refreshOnGeoChange()) {
    //     this.orgService.organisation.pipe(untilDestroyed(this)).subscribe(() => {
    //       this.refresh();
    //     })
    //   } else {
    //     if (this.isAutoReload()) {
    //       this.refresh();
    //     }
    //   }
    // }, 10);
  }

  public refresh(): void {
    // this.paginatedList.setParams(this.getDateParams());
    this.paginatedList.setParams(this.getParams());
    this.paginatedList.setParams(this.sunriseRaType());
    //this.paginatedList.refresh();
  }


  // protected getDateParams(): Map<string, string> {
  //   console.log(this.dateFunction.start())
  //   const queryParams = new Map<string, string>();

  //   queryParams.set(FROM_DATE, this.dateFunction.start());
  //   queryParams.set(TO_DATE, this.dateFunction.end());
  //   return queryParams;

  // }
  protected sunriseRaType(): Map<string, string> {
    const queryParams = new Map<string, string>();
    queryParams.set("ra_type_group", this.storeRaType)
    queryParams.set(FROM_DATE, this.dateFunction.start());
    queryParams.set(TO_DATE, this.dateFunction.end());
    return queryParams;
  }

  public handleResponse(response: PaginatedResponse<T>): void {
    this.totalRecords = response.page.count;
  }

  public refreshOnGeoChange(): boolean {
    return false;
  }

  public abstract getParams(): Map<string, string>;
  public abstract mapData(instance: any): T;
  public abstract getListConfig(): PaginatedListConfig;
  public abstract isAutoReload(): boolean;
}
