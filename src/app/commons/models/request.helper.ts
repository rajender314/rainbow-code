import { BodyComponent } from '../body/body.component';
import { BaseAPI } from 'src/app/services/api/base.api';
import { PaginatedResponse } from './common.models';
import { IonInfiniteScroll } from '@ionic/angular';
import { isNotNull, isNull, isEmpty } from 'src/app/utils/utils-function';
import { HttpErrorResponse } from '@angular/common/http';
import { Pipeline } from 'src/models/pipeline';

export class RequestHelper {

    private pageLimit: number = 40;
    private static PAGE_SIZE_PARAM_NAME = "page_size";
    private static PAGE_NUMBER_PARAM_NAME = "page";

    constructor(private body: BodyComponent, private baseAPI: BaseAPI) {
    }

    public loadList(options: RequestOptions): Promise<PaginatedResponse<any>> {
        if (isNotNull(options.infiniteScroll) && isNotNull(options.initialState)) {
            if (options.initialState.page.current_page == options.initialState.page.total_pages) {
                options.infiniteScroll.disabled = true;
                return new Promise((resolve, reject) => {
                    reject({} as any);
                });
            }
        }
        let httpCall = null;
        let params = this.buildListParams(options.params, options.initialState);
        if (options.url) {
            httpCall = this.baseAPI.executeGet({
                url: options.url,
                params: params
            });
        } else if (options.pipline) {
            httpCall = options.pipline.get(params, null);
        }
        return new Promise<PaginatedResponse<any>>((resolve, reject) => {
            this.body.reset();
            if (isNull(options.initialState)) { this.body.startLoading() };
            httpCall.subscribe(
                response => resolve(this.handleResponse(response, options)),
                error => reject(this.handleError(error, options))
            )
        });
    }

    private buildListParams(params: Map<string, string>, initialState: PaginatedResponse<any>) {
        params = isNull(params) ? new Map<string, string>() : params;
        if (initialState && initialState.page) {
            let nextPage = initialState.page.current_page + 1;
            params.set(RequestHelper.PAGE_NUMBER_PARAM_NAME, nextPage.toString());
        }
        params.set(RequestHelper.PAGE_SIZE_PARAM_NAME, this.pageLimit.toString());
        return params;
    }

    private handleResponse(response: any, options: RequestOptions): PaginatedResponse<any> {

        const isArrayResponse = Array.isArray(response);
        const isPaginatedReponse = (response && response.page);


        if (isNull(response) || (isPaginatedReponse && isEmpty(response.results))) {
            if (isNull(options.initialState)) {
                this.body.emptyResponse = true;
            }
        }
        if (options.infiniteScroll) {
            options.infiniteScroll.complete();
            if (isArrayResponse || (isPaginatedReponse && (response.page.current_page == response.page.total_pages))) {
                options.infiniteScroll.disabled = true;
            }
        }
        if (isArrayResponse) {
            //this is a dummy response;
            response = {
                page: {
                    current_page: 1,
                    next_page: null,
                    prev_page: 0,
                    total_pages: 1,
                    page_size: (response as Array<any>).length,
                    count: (response as Array<any>).length
                },
                links: [],
                results: response
            }
        }
        this.body.completeLoading();
        return response;
    }

    private handleError(error: HttpErrorResponse, options: RequestOptions): HttpErrorResponse {
        if (isNull(options.initialState)) {
            this.body.error = error;
        }
        return error;
    }
}



export interface RequestOptions {
    url?: string,
    params: Map<string, string>,
    initialState?: PaginatedResponse<any>,
    infiniteScroll?: IonInfiniteScroll,
    pipline?: Pipeline<any, any>;
}