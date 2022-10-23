import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseAPI, ResponseType } from 'src/app/services/api/base.api';
import * as moment from "moment";
import { Observable } from 'rxjs';
import { isFunction } from 'src/app/utils/utils-function';
import { AlertController, LoadingController } from '@ionic/angular';
import { saveAs } from 'file-saver';
import { PopoverService } from '../services/popover.service';
import { ERROR_TOAST_CLASS, SUCCESS_TOAST_CLASS } from 'src/constants';


@Component({
  selector: 'adj-app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {

  private static FORMAT: string = "YYMMDD_HH:mm:ss";

  @Output('on-queue')
  private onQueueEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private popover: PopoverService,
    private alertCntrl: AlertController,
    private loadingCntrl: LoadingController,
    private baseAPI: BaseAPI) { }

  ngOnInit() { }

  private fileDownloadObserable(exportFile: ExportReport): Observable<any> {
    let headers = new Map<string, string>();
    headers.set("Content-Type", exportFile.contentType);
    headers.set("Accept", "");
    return this.baseAPI
      .executeGet(
        {
          url: exportFile.url,
          headers: headers,
          params: exportFile.params,
          responseType: ResponseType.BLOB,
          isAbsoluleURL: exportFile.isAbsoluteURL,
          skipAuthHeader: (exportFile.isAbsoluteURL) ? true : false
        });
  }

  private handlePositiveResponse(response: any, loading: any,
    exportReport: ExportReport, successCallback: any): void {
    saveAs(response, this.fileDownloadName(exportReport));
    this.closeLoading(loading);
    if (isFunction(successCallback)) {
      successCallback(true);
    }
  }

  private closeLoading(loading: any): void {
    if (loading) {
      this.loadingCntrl.dismiss();
    }
  }
  private handleError(error: any, loading: any, errorCallback: any): void {
    console.log(error);
    if (isFunction(errorCallback)) {
      errorCallback(error);
    }
    this.closeLoading(loading);
  }

  private async downloadReport(exportReport: ExportReport, successCallback: any, errorCallback: any) {
    const loading = await this.loadingCntrl.create({ message: 'Downloading...' });;
    loading.present();
    this.fileDownloadObserable(exportReport).subscribe(
      response => this.handlePositiveResponse(response, loading, exportReport, successCallback),
      error => this.handleError(error, loading, errorCallback)
    );
  }

  private fileDownloadName(exportReport: ExportReport): string {
    return exportReport.name
      .concat("_")
      .concat(moment().format(ExportComponent.FORMAT))
      .concat(".")
      .concat(exportReport.type);
  }

  public async exportReport(exportReport: ExportReport) {
    const alert = await this.alertCntrl.create({
      header: `${exportReport.name} export confirmation`,
      message: 'Please click on the export button to continue with the download',
      buttons: [
        'Cancel',
        {
          text: 'Export',
          handler: () => {
            return new Promise<boolean>((resolve, reject) => {
              this.queueReport(exportReport, resolve, reject);
            });
          }
        }
      ]
    });
    alert.present();
  }

  private async queueReport(exportReport: ExportReport, successCallback: Function, errorCallback: Function) {
    const loading = await this.loadingCntrl.create({ message: 'Queuing the export request...' });;
    loading.present();
    this.baseAPI.executePost<any>({
      url: exportReport.url,
      body: exportReport.body,
      params: exportReport.params
    }).subscribe(
      response => {
        loading.dismiss();
        this.popover.showToast('The report has been queued. You would be able to download the report from export', 1500, [SUCCESS_TOAST_CLASS])
        if (successCallback) {
          successCallback(response)
          this.onQueueEvent.emit(response)
        }
      },
      error => {
        loading.dismiss();
        this.popover.showToast('The report could not be queued. Please try later', 1500, [ERROR_TOAST_CLASS])
        if (errorCallback) {
          errorCallback(error)
        }
      }
    );
  }

  public async startDownload(exportReport: ExportReport) {
    const alert = await this.alertCntrl.create({
      header: `${exportReport.name} download confirmation`,
      message: 'Please click on the download button to continue with the download',
      buttons: [
        'Cancel',
        {
          text: 'Download',
          handler: () => {
            return new Promise<boolean>((resolve, reject) => {
              this.downloadReport(exportReport, resolve, reject);
            });
          }
        }
      ]
    });
    alert.present();
  }
}


export interface ExportReport {
  name: string,
  url: string,
  type: string,
  contentType: string,
  params?: Map<string, string>
  isAbsoluteURL?: boolean;
  body?: any;
}