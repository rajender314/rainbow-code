import { Component, Inject, OnInit, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResponse, UIActionParams } from 'src/app/commons/models/common.models';
import { MultiSelectComponent } from 'src/app/commons/multi-select/multi-select.component';
import { ACTION_PARAMS } from 'src/app/commons/services/data-provider.service';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { OrganisationService } from 'src/app/services/organisation/organisation.service';
import { isFunction, isNotEmpty } from 'src/app/utils/utils-function';
import { apiDirectory } from 'src/global';
import { Beat, Distributor, Identifiable, OrganisationNode, StoreType } from 'src/models/app.models';
import { SunriseStoreFilter } from '../sunrise-store.models';

@Component({
  selector: 'adj-sunrise-store-filter',
  templateUrl: './sunrise-store-filter.component.html',
  styleUrls: ['./sunrise-store-filter.component.scss'],
})
export class SunriseStoreFilterComponent implements OnInit {

  public showGeography: boolean;
  public showStores: boolean;
  public showFollowCalendar: boolean = false;
  public showOnlyMissingVisits: boolean = false;
  public showVisitDay: boolean = false;
  public filter: SunriseStoreFilter;
  public apiDirectory: any = apiDirectory;
  public storeType$: Observable<PaginatedResponse<StoreType>>;
  public beatType$: Observable<Array<Identifiable>>;
  public beat$: Observable<Array<Beat>>;
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
    @Inject(ACTION_PARAMS) private inputData: UIActionParams) { }

  ngOnInit() {
    const params = new Map<string, any>();
    params.set('page_size', 100)
    this.distributorTemplate = this.popover.templateProvider.getTemplate('distributorTemplate');
    const currentFilter = this.inputData.data.parameters.current;
    this.filter = (currentFilter) ? currentFilter.copy() : new SunriseStoreFilter();
    this.storeType$ = this.baseAPI.executeGet({ url: apiDirectory.users, params: params });
    this.beat$ = this.getBeats();
    console.log("BEATS: "+JSON.stringify(this.beat$));
    this.beatType$ = of([
      { id: "Monday", name: "Monday" },
      { id: "Tuesday", name: "Tuesday" },
      { id: "Wednesday", name: "Wednesday" },
      { id: "Thursday", name: "Thursday" },
      { id: "Friday", name: "Friday" },
      { id: "Saturday", name: "Saturday" }
    ]);
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
    this.organisationNodes$ = this.orgService.allOrganisationNodes;
    this.showStores = this.inputData.data.parameters.showStores;
    this.showFollowCalendar = this.inputData.data.parameters.showFollowCalendar;
    this.showOnlyMissingVisits = this.inputData.data.parameters.showOnlyMissingVisits;
    this.summaryParams = new Map<string, any>();
    this.summaryParams.set("summary", "true");
    this.summaryParams.set("status", "true");
  }

  public reset(): void {
    this.filter = new SunriseStoreFilter();
    if (this.multiselects) {
      this.multiselects.forEach(select => select.reset());
    }
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
    const beatNameControl = this.multiselects.find(ms => ms.name == 'beatName');
    beatNameControl.reset();
    this.filter.beatName = null;
    this.beat$ = this.getBeats();
  }

  private getBeats(): Observable<Array<Beat>> {
    const params = new Map<string, any>();
    params.set('page_size', 100);
    if (isNotEmpty(this.filter.beatType)) {
      params.set("type", this.filter.nullOrPrimaryKeys(this.filter.beatType, (instance: any) => instance.id))
    }
    return this.baseAPI
      .get<PaginatedResponse<Beat>>({ url: apiDirectory.beatList, params: params })
      .pipe(map(response => {
        return response.results.map(beat => this.mapBeat(beat))
      }));
  }
}
