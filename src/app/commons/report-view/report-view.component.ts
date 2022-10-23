import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { UIActionParams, PaginatedResponse, Option } from '../models/common.models';
import { ReportDefinition, ProcessInstance, DownloadParams } from 'src/models/app.models';
import { PaginatedListComponent, PaginatedListConfig } from '../paginated-list/paginated-list.component';
import { apiDirectory } from 'src/global';
import { mapOf, displayStatus, toCamelCase, unsubscribeAll, isNotNull, isNotEmpty, pluck } from 'src/app/utils/utils-function';
import { ModalService } from 'src/app/commons/services/modal-provider.service';
import { ProcessInstanceViewComponent } from '../process-instance-view/process-instance-view.component';
import { ExportComponent } from '../export/export.component';
import { FROM_DATE, PDF, PDF_CONTENT_TYPE, RIGHT_ALIGNED_MODAL, TO_DATE, CSV_CONTENT_TYPE, CSV } from 'src/constants';
import { from, Observable, Subscription } from 'rxjs';
import { DateFunction, DateUtil } from '../models/date.models';
import { PopoverService } from '../services/popover.service';
import { Filter } from 'src/models/filter.model';
import { AuthCheckDirective } from '../directives/auth-check/auth-check.directive';

@Component({
  selector: 'adj-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
})
export class ReportViewComponent implements OnInit {

  public report: ReportDefinition;
  public totalRecords: number;
  public paginatedListConfig: PaginatedListConfig;
  public dateFunction: DateFunction;
  public showDownloadReport: boolean;
  private showMultipleReportOptions: boolean;

  @ViewChild(PaginatedListComponent)
  private paginatedList: PaginatedListComponent;

  @ViewChild(ExportComponent)
  private exportElement: ExportComponent;
  private subscriptions: Array<Subscription>;
  public filter: Filter;
  public downloadPermissions: Array<string> = [AuthCheckDirective.ALLOWED]
  public mapReportInstance: Function;


  constructor(
    @Inject(ACTION_PARAMS) private inputData: UIActionParams,
    private modalService: ModalService,
    private popoverService: PopoverService) {
    const parameters = this.inputData.data.parameters;
    this.report = parameters.report
    this.subscriptions = new Array<Subscription>();
    this.dateFunction = (parameters.dateFunction) ? parameters.dateFunction : DateUtil.ALL_DURATION;
    const showFilter = (this.inputData.data.parameters.showFilter);
    if (showFilter) {
      this.filter = this.inputData.data.parameters.filter;
    }
    this.showDownloadReport = isNotNull(this.report.download_options) && isNotNull(this.report.download_options.report)
    if (this.showDateOptions && isNotEmpty(this.report.permissions)) {
      this.downloadPermissions = this.report.permissions;
    }
    this.showMultipleReportOptions = (this.showDownloadReport && Array.isArray(this.report.download_options.report)) ? true : false
    this.mapReportInstance = this.mapInstance.bind(this);
  }

  public mapInstance(reportInstance: ProcessInstance): any {
    const _instance: ProcessInstance = { ...reportInstance }
    _instance.displayStatus = displayStatus(_instance.status)
    if (this.report.extra_columns) {
      console.log('processing extra columns')
      this.report.extra_columns.forEach((column: any) => {
        _instance[column.value_lookup] = this.retrieveValue(_instance, column.value_lookup);
      });
    }
    return _instance;
  }

  public retrieveValue(instance: ProcessInstance, lookupExpression: string): any {
    const field_separator = "__";
    let finalExpression = lookupExpression;
    let index_of_separator = lookupExpression.indexOf(field_separator)
    if (index_of_separator > -1) {
      let expression = lookupExpression
      let currentValue = instance
      while (expression && expression.length > 0) {
        const field_name = expression.substring(0, index_of_separator)
        currentValue = currentValue[field_name]
        const length_adjusted_index = index_of_separator + 2
        expression = expression.substring(length_adjusted_index)
        index_of_separator = expression.indexOf(field_separator)
        if (index_of_separator < 0) {
          finalExpression = expression;
          expression = undefined;
        }
        const finalValue = currentValue[finalExpression];
        return finalValue;
      }
    }
    return instance[lookupExpression];
  }

  public toCamelcase(value: string): string {
    return toCamelCase(value, '_')
  }

  public close(): void {
    this.inputData.data.onClose(null, 'close');
  }

  private getParams(): Map<string, any> {
    const params = new Map<string, any>();
    params.set('report_id', this.report.id);
    params.set(FROM_DATE, this.dateFunction.start());
    params.set(TO_DATE, this.dateFunction.end());
    if (this.filter) {
      this.filter.toQureryMap().forEach((value, key) => {
        params.set(key, value);
      })
    }
    return params;
  }

  private refresh(): void {
    this.paginatedList.setParams(this.getParams())
    this.paginatedList.refresh();
  }

  public handleResponse(response: PaginatedResponse<any>): void {
    this.totalRecords = response.page.count;
  }

  ngOnInit() {

  }

  public showProcessHistory(event: Event, instance: ProcessInstance): void {
    this.modalService.showModal({
      component: ProcessInstanceViewComponent,
      params: {
        instance: instance
      },
      event: event,
      cssClasses: ['report-view-modal']
    });
  }

  

  private startDownload(downloadParams: DownloadParams): void {
    if (downloadParams) {
      const params = new Map<string, string>(this.filter.toQureryMap());
      const configuredParams = downloadParams.params;
      Object.keys(configuredParams).forEach(key => {
        params.set(key, configuredParams[key]);
      });
      this.exportElement.startDownload(
        {
          url: downloadParams.url,
          contentType: CSV_CONTENT_TYPE,
          name: downloadParams.name,
          type: CSV,
          params: params
        }
      )
    }
  }

  public downloadReport(event: Event, report: ReportDefinition): void {
    event.stopPropagation();
    if (this.showMultipleReportOptions) {
      const options = new Array<Option<DownloadParams>>();
      const downloadConfigs = (report.download_options.report as Array<DownloadParams>);
      if (Array.isArray(downloadConfigs)) {
        downloadConfigs.forEach(downloadConfig => {
          options.push({ label: downloadConfig.name, value: downloadConfig, icon: 'download-outline' })
        });
        this.popoverService.showActions({
          event: event,
          params: {
            options: options
          },
          selectHandler: (option: Option<DownloadParams>) => {
            this.startDownload(option.value)
          }
        })
      }
    } else {
      this.startDownload(report.download_options.report as DownloadParams)
    }
  }

  public download(event: Event, instance: ProcessInstance, report: ReportDefinition): void {
    event.stopPropagation();
    this.exportElement.startDownload(
      {
        url: (report.download_options.instance as DownloadParams).url,
        contentType: PDF_CONTENT_TYPE,
        name: report.name,
        type: PDF,
        params: mapOf({ key: 'instance_id', value: new String(instance.id).toString() })
      }
    )
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions)
  }

  public showDateOptions(event: Event) {
    this.popoverService.showDateOptions({
      event: event,
      selectHandler: (response: Option<any>) => {
        this.dateFunction = (response.value) ? response.value.dateFunction : this.dateFunction;
        this.refresh();
      }
    }, this.dateFunction)
  }

  public showFilter(event: Event): void {
    if (this.filter) {
      this.modalService.showModal({
        event: event,
        component: this.inputData.data.parameters.filterComponentClass,
        params: {
          current: this.filter.copy(),
          report: this.report
        },
        selectHandler: (filter: Filter) => {
          this.filter = filter;
          this.refresh();
        },
        cssClasses: [RIGHT_ALIGNED_MODAL]
      });
    }
  }
}
