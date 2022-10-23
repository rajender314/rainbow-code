import { FilteredData } from './../../../models/app.models';
import { VisitFilter } from './../visit.model';
import { Component, Inject, OnInit, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResponse, UIActionParams } from './../../../app/commons/models/common.models';
import { MultiSelectComponent } from './../../../app/commons/multi-select/multi-select.component';
import { ACTION_PARAMS } from './../../../app/commons/services/data-provider.service';
import { PopoverService } from './../../../app/commons/services/popover.service';
import { BaseAPI } from './../../../app/services/api/base.api';
import { OrganisationService } from './../../../app/services/organisation/organisation.service';
import { isFunction, isNotEmpty } from './../../../app/utils/utils-function';
import { apiDirectory } from './../../../global';
import { Beat, Identifiable, OrganisationNode, StoreType } from './../../../models/app.models';
import { mapOf } from '../../utils/utils-function';
@Component({
  selector: 'adj-visit-filter',
  templateUrl: './visit-filter.component.html',
  styleUrls: ['./visit-filter.component.scss'],
})
export class VisitFilterComponent implements OnInit {

  public showGeography: boolean;
  public showStores: boolean;
  public typeFiter: number;
  public showFollowCalendar: boolean = false;
  public showOnlyMissingVisits: boolean = false;
  public showVisitDay: boolean = false;
  public filter: VisitFilter;
  public apiDirectory: any = apiDirectory;
  public storeType$: Observable<PaginatedResponse<StoreType>>;
  public branchNames: Array<FilteredData>;
  public raTypes: Array<FilteredData> = [];
  public raColors: Array<FilteredData> = [];
  public beatsNames: Array<FilteredData>;

  public markets$: Observable<Array<any>>;
  public merchantiser$: Observable<Array<any>>;
  public day$: Observable<Array<Identifiable>>;
  public week$: Observable<Array<Identifiable>>;
  public organisationNodes$: Observable<Array<OrganisationNode>>
  public summaryParams: Map<string, string>;
  public distributorTemplate: TemplateRef<any>;


  @ViewChildren(MultiSelectComponent)
  private multiselects: QueryList<MultiSelectComponent>;

  constructor(
    private popover: PopoverService,
    private orgService: OrganisationService,
    private baseAPI: BaseAPI,
    @Inject(ACTION_PARAMS) public inputData: UIActionParams) { }

  ngOnInit() {
    const params = new Map<string, any>();
    params.set('page_size', 100)
    this.distributorTemplate = this.popover.templateProvider.getTemplate('distributorTemplate');
    const currentFilter = this.inputData.data.parameters.current;
    this.filter = (currentFilter) ? currentFilter.copy() : new VisitFilter();
    this.storeType$ = this.baseAPI.executeGet({ url: apiDirectory.users, params: params });
    this.markets$ = this.getMarkets();
    this.merchantiser$ = this.getMerchantiser();
    // console.log("BEATS: "+JSON.stringify(this.markets$));

    this.day$ = of([
      { id: "MONDAY", name: "Monday" },
      { id: "TUESDAY", name: "Tuesday" },
      { id: "WEDNESDAY", name: "Wednesday" },
      { id: "THURSDAY", name: "Thursday" },
      { id: "FRIDAY", name: "Friday" },
      { id: "SATURDAY", name: "Saturday" },
      { id: "SUNDAY", name: "Sunday" },
    ])
    this.week$ = of([
      { id: "1", name: "First week of the month" },
      { id: "2", name: "Second week of the month" },
      { id: "3", name: "Third week of the month" },
      { id: "4", name: "Fourth week of the month" },
      { id: "5", name: "Fifth week of the month" }
    ]);
    this.branchList();
    this.raTypesList();
    this.raColorList();
    this.beatsList();
    this.organisationNodes$ = this.orgService.allOrganisationNodes;
    this.showStores = this.inputData.data.parameters.showStores;
    this.typeFiter = this.inputData.data.parameters.type;

    this.showFollowCalendar = this.inputData.data.parameters.showFollowCalendar;
    this.showOnlyMissingVisits = this.inputData.data.parameters.showOnlyMissingVisits;
    this.summaryParams = new Map<string, any>();
    this.summaryParams.set("summary", "true");
    this.summaryParams.set("status", "true");

  }

  public reset(): void {
    this.filter = new VisitFilter();
    if (this.multiselects) {
      this.multiselects.forEach(select => select.reset());
    }
  }

  public branchList(): void {
    const params = new Map<string, any>();
    params.set('page_size', 100);

    this.baseAPI.executeGet({
      url: apiDirectory.branchList,
      params: mapOf({
        key: 'page_size',
        value: 40
      })
    }).subscribe(response => {
      if (response.results && response.results.length) {
        this.branchNames = response.results;
        this.branchNames.map(obj => {
          obj['name'] = obj['branch'];
        })
      }
    })
  }

  public raTypesList(): void {
    const params = new Map<string, any>();
    params.set('page_size', 100);

    this.baseAPI.executeGet({
      url: apiDirectory.raTypesList,
      params: mapOf({
        key: 'page_size',
        value: 40
      })
    }).subscribe(response => {
      if (response.results && response.results.length) {
        let raTypesNames = response.results;
        for (let i = 0; i < raTypesNames.length; i++) {
          this.raTypes.push({ name: raTypesNames[i] })
        }
      }
    })
  }
  public raColorList(): void {
    const params = new Map<string, any>();
    params.set('page_size', 100);

    this.baseAPI.executeGet({
      url: apiDirectory.raColorList,
      params: mapOf({
        key: 'page_size',
        value: 40
      })
    }).subscribe(response => {
      if (response.results && response.results.length) {
        let raColorNames = response.results;
        for (let i = 0; i < raColorNames.length; i++) {
          this.raColors.push({ name: raColorNames[i] })
        }
      }
    })
  }

  public beatsList(): void {
    const params = new Map<string, any>();
    params.set('page_size', 100);

    this.baseAPI.executeGet({
      url: apiDirectory.Beats,
      params: mapOf({
        key: 'page_size',
        value: 40
      })
    }).subscribe(response => {
      if (response.results && response.results.length) {
        this.beatsNames = response.results;
        this.beatsNames.map(obj => {
          obj['name'] = obj['beat_name'];

        })

      }
    })
  }

  public close(): void {
    if (isFunction(this.inputData.data.onClose)) {
      this.inputData.data.onClose(null, 'closed');
    }
  }

  public submit(): void {
    if (isFunction(this.inputData.data.onClose)) {
      this.inputData.data.onClose(this.filter, 'selected');
    }
  }

  public mapBeat(beat: Beat): Beat {
    return { ...beat, name: `${beat.type}` }
  }

  public handleBeatTypeSelection(): void {
    if (this.multiselects) {
      const beatNameControl = this.multiselects.find(ms => ms.name == 'beatName');
      beatNameControl.reset();
    }

    // this.filter.beatName = null;
    this.markets$ = this.getMarkets();


  }

  public handleMerchantTypeSelection(): void {
    if (this.multiselects) {
      const beatNameControl = this.multiselects.find(ms => ms.name == 'merchantName');
      beatNameControl.reset();
    }
    // this.filter.beatName = null;
    this.merchantiser$ = this.getMerchantiser();
  }

  private getMarkets(): Observable<Array<Beat>> {
    const params = new Map<string, any>();
    if (isNotEmpty(this.filter.branch)) {
      params.set("branch", this.filter.nullOrPrimaryKeys(this.filter.branch, (instance: any) => instance.branch))
    }
    return this.baseAPI
      .get<PaginatedResponse<any>>({ url: apiDirectory.marketNames, params: params })
      .pipe(map(response => {
        // this.markets$ = response.results;
        return response.results
      }));
  }


  private getMerchantiser(): Observable<Array<Beat>> {
    const params = new Map<string, any>();
    if (isNotEmpty(this.filter.branch)) {
      params.set("branch", this.filter.nullOrPrimaryKeys(this.filter.branch, (instance: any) => instance.branch))
    }
    return this.baseAPI
      .get<PaginatedResponse<any>>({ url: apiDirectory.merchantiser, params: params })
      .pipe(map(response => {
        // this.markets$ = response.results;
        return response.results
      }));
  }
}
