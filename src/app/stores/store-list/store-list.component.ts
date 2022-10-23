import { VisitFilterComponent } from './../../visits/visit-filter/visit-filter.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericListComponentComponent } from './../../../app/commons/generic-list-component/generic-list-component.component';
import { DateUtil } from './../../../app/commons/models/date.models';
import { PaginatedListConfig } from './../../../app/commons/paginated-list/paginated-list.component';
import { isNotBlank } from './../../../app/utils/utils-function';
import { FROM_DATE, RIGHT_ALIGNED_MODAL, SEARCH, STATUS, TO_DATE } from './../../../constants';
import { apiDirectory } from './../../../global';
import { Status, StoreDetails } from './../../../models/app.models';
import { StoreDetailsComponent } from '../store-details/store-details.component';
import { StoreFilterComponent } from '../store-filter/store-filter.component';
import { StoreFilter } from '../store.models';
import { Option, PaginatedResponse } from './../../../app/commons/models/common.models';
import { VisitFilter } from '../../visits/visit.model';

@Component({
  selector: 'adj-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent extends GenericListComponentComponent<StoreDetails> implements OnInit {

  public status: Status;
  public searchInput: FormControl;
  public selectAll: boolean;
  public storeFilter: StoreFilter;

  public filterBranchList: Array<any> = [];
  public filterRaType: Array<any> = [];
  public filterRaColor: Array<any> = [];
  public filterBeatList: Array<any> = [];
  public filterMarketList: Array<any> = [];
  public filterMerchandiserList: Array<any> = [];


  ngOnInit(): void {
    super.ngOnInit();
    this.searchInput = new FormControl();
    this.storeFilter = new StoreFilter();
    this.dateFunction = DateUtil.ALL_DURATION;
    this.status = { value: true, label: 'Active', name: 'status' }
  }

  ngAfterViewInit(): void {
    this.refresh();
  }


  public getListConfig(): PaginatedListConfig {
    return { url: apiDirectory.storeDetailList };
  }

  public isAutoReload(): boolean {
    return false;
  }

  public mapData(instance: StoreDetails): StoreDetails {
    (instance as any).selected = this.selectAll;
    return instance;
  }

  public getParams(): Map<string, string> {
    let params = this.filterParameters();
    this.paginatedList.setParams(params);
    this.paginatedList.refresh();
    return new Map<string, string>();
  }
  public clear(): void {
    this.searchInput.reset();
    this.refresh();
  }

  public showStoreDetails(mode: string, store: StoreDetails): void {
    this.modalService.showModal({
      component: StoreDetailsComponent,
      params: {
        mode: mode,
        store: store,
        storeId: store.store_id,
        title: 'Store Details'
      },
      cssClasses: [RIGHT_ALIGNED_MODAL]
    })
  }

  private getFilterParams(filter: VisitFilter) {
    for (let property in filter) {
      if (property == "branch") {
        filter[property].map((obj) => {
          this.filterBranchList.push(obj.branch);
        });
      }

      if (property == "RAType") {
        filter[property].map((obj) => {
          this.filterRaType.push(obj.name);
        });
      }

      if (property == "RAColor") {
        filter[property].map((obj) => {
          this.filterRaColor.push(obj.name);
        });
      }

      if (property == "Beat") {
        filter[property].map((obj) => {
          this.filterBeatList.push(obj.name);
        });
      }

      if (property == "MarketName") {
        filter[property].map((obj) => {
          this.filterMarketList.push(obj.name);
        });
      }
      if (property == "Merchandiser") {
        filter[property].map((obj) => {
          this.filterMerchandiserList.push(obj.name);
        });
      }
    }

  }


  public showFilter(event: Event): void {
    this.modalService.showModal({
      component: VisitFilterComponent,
      params: {
        current: this.storeFilter,
        showStores: true,
        title: 'Store Filter',
        type: 2
      },
      selectHandler: (filter: VisitFilter) => {
        if (Object.keys(filter).length) {
          this.getFilterParams(filter);
        } else {
          this.filterBranchList = [];
          this.filterBeatList = [];
          this.filterRaColor = [];
          this.filterRaType = [];
          this.filterMarketList = [];
          this.filterMerchandiserList = [];
        }
        this.selectAll = false;
        this.refresh();
      },
      cssClasses: [RIGHT_ALIGNED_MODAL]
    })
  }

  public performSearch(): void {
    // this.refresh();
    this.getParams();
  }

  private filterParameters(): Map<string, any> {
    const params = new Map<string, any>();
    console.log(this.searchInput.value)

    if (isNotBlank(this.searchInput.value)) {
      params.set("search_key", this.searchInput.value);
    }
    params.set("activity_id", '111');
    params.set("branch", this.filterBranchList);
    params.set("ra_type", this.filterRaType);
    params.set("ra_color", this.filterRaColor);
    params.set("beat_name", this.filterBeatList);
    params.set("market_name", this.filterMarketList);
    params.set("marchendiser_name", this.filterMerchandiserList);
    params.set(FROM_DATE, this.dateFunction.start());
    params.set(TO_DATE, this.dateFunction.end());
    return params;
  }
  public exportVisits($event: Event): void {
    this.uiProvider.showActions({
      event: $event,
      params: {
        options: [
          { label: 'CSV', value: null, name: 'status', },
          { label: 'PDF', value: true, name: 'status', },
          { label: 'PPT', value: false, name: 'status', },
        ],
        selectedValue: this.status
      },
      selectHandler: (option: Option<boolean>) => {
        this.status = { value: option.value, label: option.label, name: 'status' };
        //this.downloadexport()
        // this.refresh();
      }
    })
  }
}
