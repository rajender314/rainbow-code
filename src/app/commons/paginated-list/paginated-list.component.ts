import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { PaginatedResponse } from '../models/common.models';
import { BaseAPI } from 'src/app/services/api/base.api';
import { BodyComponent } from '../body/body.component';
import { RequestHelper } from '../models/request.helper';
import { isNotNull, isNotEmpty, isFunction, isNull, emptyPaginatedResponse, mergePaginatedResponse } from 'src/app/utils/utils-function';
import { Pipeline } from 'src/models/pipeline';

@Component({
  selector: 'adjoint-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: ['./paginated-list.component.scss'],
})
export class PaginatedListComponent implements OnInit {

  private requestHelper: RequestHelper;
  public currentState: PaginatedResponse<any>;

  @Input('config')
  private config: PaginatedListConfig;

  @Input('mapFn')
  private mapFn: Function;

  @Input('smTemplate')
  public smTemplate: TemplateRef<any>;

  @Input('lgTemplate')
  public lgTemplate: TemplateRef<any>;

  @Output('onContent')
  private contentEvent: EventEmitter<any>;

  constructor(
    private body: BodyComponent,
    private baseAPI: BaseAPI) {
    this.contentEvent = new EventEmitter<any>();
    this.requestHelper = new RequestHelper(this.body, this.baseAPI);
  }

  ngOnInit() {

  }

  public loadList(event?: Event): void {
    this.requestHelper
      .loadList({
        url: this.config.url,
        params: this.config.params,
        initialState: this.currentState,
        infiniteScroll: (event) ? (event.target as any) : null,
        pipline: this.config.pipeline
      })
      .then(
        (listResponse: PaginatedResponse<any>) => {
          if (isNotNull(listResponse) && isNotEmpty(listResponse.results) && isFunction(this.mapFn)) {
            listResponse.results = listResponse.results.map(c => this.mapFn(c));
          }
          if (isNotNull(listResponse)) { this.handleServerResponse(listResponse) };
        })
      .catch(error => {
        console.log(error);
      })
  }

  private handleServerResponse(listResponse: PaginatedResponse<any>): void {
    if (isNull(this.currentState)) {
      this.currentState = emptyPaginatedResponse();
    }
    this.currentState = mergePaginatedResponse(listResponse, this.currentState);
    this.contentEvent.emit(listResponse);
  }

  public refresh(): void {
    this.currentState = null;
    this.loadList();
  }

  public setParams(params: Map<string, string>): void {
    if (this.config) {
      this.config.params = params;
    }
  }
}


export interface PaginatedListConfig {
  url?: string,
  params?: Map<string, string>;
  pipeline?: Pipeline<any, any>;
}