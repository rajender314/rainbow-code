import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExportComponent } from '../export/export.component';

@Component({
  selector: 'adj-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  @Input('config')
  public pageConfig: any;

  public showExportReportStatus: boolean = true;

  constructor() { }

  ngOnInit() { }

  // @ViewChild(DownloadStatusComponent)
  // private downloadComponentStatus: DownloadStatusComponent;

  @ViewChild(ExportComponent)
  private exportElement: ExportComponent;

  // public handleQueueRequest(event: any): void {
  //   this.showExportReportStatus = true;
  //   this.downloadComponentStatus.changeDisplayStatus = false;
  //   setTimeout(() => {
  //     this.downloadComponentStatus.refresh();
  //   }, 10);
  // }

  public get export(): ExportComponent {
    return this.exportElement;
  }

  public handleReportExports(event: { reports: number }): void {
    this.showExportReportStatus = true
  }
}
