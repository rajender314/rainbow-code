import { VisitFilterComponent } from "./../visit-filter/visit-filter.component";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Store } from "@datorama/akita";
import { GenericListComponentComponent } from "./../../../app/commons/generic-list-component/generic-list-component.component";
import { DateUtil } from "./../../../app/commons/models/date.models";
import { PaginatedListConfig } from "./../../../app/commons/paginated-list/paginated-list.component";
import { isNotBlank } from "./../../../app/utils/utils-function";
import {
  FROM_DATE,
  RIGHT_ALIGNED_MODAL,
  SEARCH,
  STATUS,
  TO_DATE,
} from "./../../../constants";
import { apiDirectory } from "./../../../global";
import {
  Status,
  StoreDetails,
  VisitDetails,
} from "./../../../models/app.models";
import { VisitDetailsComponent } from "../visit-details/visit-details.component";
import {
  Option,
  PaginatedResponse,
} from "./../../../app/commons/models/common.models";
import { BodyComponent } from "./../../../app/commons/body/body.component";
import { HttpHeaders } from "@angular/common/http";
import { PostRequest } from "src/app/services/api/base.api";
import { VisitFilter } from "../visit.model";

@Component({
  selector: "adj-visit-list",
  templateUrl: "./visit-list.component.html",
  styleUrls: ["./visit-list.component.scss"],
})
export class VisitListComponent
  extends GenericListComponentComponent<StoreDetails>
  implements OnInit {
  public status: Status;
  public searchInput: FormControl;
  public selectAll: boolean;
  public filterBranchList: Array<any> = [];
  public filterRaType: Array<any> = [];
  public filterRaColor: Array<any> = [];
  public filterBeatList: Array<any> = [];
  public filterMarketList: Array<any> = [];
  public filterMerchandiserList: Array<any> = [];
  public visits: VisitDetails;
  public params: Map<string, any>;
  public downloadUrl: any;
  private body: BodyComponent;
  public VisitFilter: VisitFilter;

  public fileName: string;
  public eventType: number;
  public reportType: string;
  public messge: string;

  ngOnInit(): void {
    super.ngOnInit();

    this.searchInput = new FormControl();
    this.VisitFilter = new VisitFilter();
    this.dateFunction = DateUtil.ALL_DURATION;
    this.status = { value: true, label: "Active", name: "status" };
  }

  ngAfterViewInit(): void {
    this.refresh();
  }
  public performSearch(): void {
    // this.refresh();
    this.getParams();
  }

  public getListConfig(): PaginatedListConfig {
    return { url: apiDirectory.visitsList };
  }

  public downloadexportCsv() {
    let urlValue = this.status.value;
    this.getUrl(urlValue);
    let params = this.filterParameters();
    this.baseAPI
      .executeGet({
        url: this.downloadUrl,
        params: params,
      })
      .subscribe(
        (response) => { },
        (error) => {
          let data = error.error.text;
          if (data) {
            this.downloadFile("csv", data, this.fileName);
          } else {
            this.uiProvider.showToast("Something went Wrong", 2000);
          }

        }
      );
  }
  private getUrl(urlValue: boolean) {
    if (urlValue == null) {
      this.downloadUrl = apiDirectory.visitsDownload;
      this.fileName = "VisitsReports.csv";
    }
  }
  public downloadFile(type, data, fileName) {
    let content;
    if (type == "csv") {
      content = "data:attachment/csv;charset=utf-8," + encodeURI(data);
    }
    let a = document.createElement("a");
    a.textContent = "download";
    a.download = fileName;
    a.href = content;
    a.click();
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

  private filterParameters(): Map<string, any> {
    const params = new Map<string, any>();

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
  public clear(): void {
    this.searchInput.reset();
    this.refresh();
  }

  public exportVisits($event: Event): void {
    this.uiProvider.showActions({
      event: $event,
      params: {
        options: [
          { label: "CSV", value: null, name: "status" },
          { label: "PDF", value: true, name: "status" },
          { label: "PPT", value: false, name: "status" },
        ],
      },
      selectHandler: (option: Option<boolean>) => {
        this.status = {
          value: option.value,
          label: option.label,
          name: "status",
        };
        if (this.status.value == null) {
          this.downloadexportCsv();
        } else {
          this.downloadexport(this.status.value);
        }
      },
    });
  }

  public downloadexport(value) {
    this.selectedData(value);
    let postParametrs = this.getPostParms();
    const headers: Map<string, string> = new Map<string, string>();
    const request: PostRequest<any> = {
      body: postParametrs,
      url: apiDirectory.visitsDownloadPdf,
      headers: headers,
    };
    return this.baseAPI.executePost(request).subscribe(
      (response) => {
        this.uiProvider.showToast(this.messge, 5000);
      },
      (error) => { }
    );
  }
  private selectedData(value) {
    if (value == true) {
      this.eventType = 16;
      this.reportType = "RAINBOW_STORES_PDF";
      this.messge = " PDF has been executed successfully. You will receive email an email shortly with the downladable link";
    } else if (value == false) {
      this.eventType = 17;
      this.reportType = "RAINBOW_STORES_PPTX";
      this.messge = "PPT has been executed successfully. You will receive email an email shortly with the downladable link";
    }
  }
  public getPostParms() {
    let k = "2020-02-03 12:55:50";
    let l = "2020-02-03";
    const postParametrs = {
      event_type: this.eventType,
      cron: k,
      start_date: l,
      schedule_type: "TIME",
      extra_data: {
        report_type: this.reportType,
        from_date: this.dateFunction.start(),
        to_date: this.dateFunction.end(),
        branch: this.filterBranchList,
        ra_type: this.filterRaType,
        ra_color: this.filterRaColor,
        beat_name: this.filterBeatList,
        market: this.filterMarketList,
        name: this.filterMerchandiserList,
        search_key: this.searchInput.value,
      },
    };
    return postParametrs;
  }
  public showVisitDetails() {
    // this.modalService.showModal({
    //   component: VisitDetailsComponent,
    //   params: {
    //     mode: mode,
    //     store: store,
    //     visit: visit,
    //     title: 'Visit Details'
    //   },
    //   cssClasses: [RIGHT_ALIGNED_MODAL]
    // })

    this.modalService.showModal({
      component: VisitFilterComponent,
      params: {
        current: this.VisitFilter,
        showStores: true,
        title: 'Visit Filter',
        type: 1
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
      cssClasses: [RIGHT_ALIGNED_MODAL],
    });
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
        console.log(property);
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

    console.log(this.filterBranchList);
    // return branch_id
    // this.modalService.showModal({
    //   component: VisitFilterComponent,
    //   params: {
    //     showStores: true
    //   },
    //   selectHandler: (filter: StoreFilter) => {
    //     this.selectAll = false;
    //     this.storeFilter = filter;
    //     this.refresh();
    //   },
    //   cssClasses: [RIGHT_ALIGNED_MODAL]
    // })
  }
}
