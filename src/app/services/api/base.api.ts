import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isNotNull, isNotBlank } from 'src/app/utils/utils-function';
import { SelectorFlags } from '@angular/compiler/src/core';
import { apiDirectory } from 'src/global';

import {stores} from 'src/assets/static-api-response/stores';
import { visits } from 'src/assets/static-api-response/visits';
import { beats } from 'src/assets/static-api-response/beats';
import { merchandiser } from 'src/assets/static-api-response/merchandiser';
import { Salesman } from 'src/models/app.models';
import { visits_summary } from 'src/assets/static-api-response/visits-summary';
import { visit_history } from 'src/assets/static-api-response/visit-history';
import { actual_coverage } from 'src/assets/static-api-response/actual-coverage';
import { target_coverage } from 'src/assets/static-api-response/target-coverage';
import { escalation_history } from 'src/assets/static-api-response/escalation-history';
import { escalation_summary } from 'src/assets/static-api-response/escalation-summary';
import { organisation_data } from 'src/assets/static-api-response/organisation';
import { kde_change_request } from 'src/assets/static-api-response/kde-change-request';
import { visit_pre_images } from 'src/assets/static-api-response/visit-pre-images';
import { visit_post_images } from 'src/assets/static-api-response/visit-post-images';
import { user_list } from 'src/assets/static-api-response/user-list';
import { single_user } from 'src/assets/static-api-response/user';
import { beat_list } from 'src/assets/static-api-response/beat-list';

@Injectable({
    providedIn: 'root'
})
export class BaseAPI {

    constructor(
        private httpClient: HttpClient) {
    }

    private getFinalURL(requestOptions: Request): string {
        return (requestOptions.isAbsoluleURL) ? requestOptions.url : environment.api + requestOptions.url;
    }

    public get<T>(requestOptions: Request): Observable<T> {
       
         if(requestOptions.url == apiDirectory.beatsList){
            return of(beats as any);
        }
        else if(requestOptions.url == apiDirectory.merchandiserList){
            return of(merchandiser as any);
        }else if(requestOptions.url == apiDirectory.salesSummaryReport){
            return of(visits_summary as any);
        }else if(requestOptions.url == apiDirectory.salesHistoryReport){
            return of(visit_history as any);
        }else if(requestOptions.url == apiDirectory.actualCoverageSummaryReport){
            return of(target_coverage as any);
        }else if(requestOptions.url == apiDirectory.tagetCoverageHistoryReport){
            return of(actual_coverage as any);
        }else if(requestOptions.url == apiDirectory.escalationSummaryReport){
            return of(escalation_summary as any);
        }else if(requestOptions.url == apiDirectory.escalationHistoryReport){
            return of(escalation_history as any);
        }
        else if(requestOptions.url == apiDirectory.organisationNodes){
            return of(organisation_data as any);
        }
        // else if(requestOptions.url == apiDirectory.visits){
        //     return of(visits as any);
        // }
        else if(requestOptions.url == apiDirectory.kdeRequests){
            return of(kde_change_request as any);
        }else if(requestOptions.url == apiDirectory.visitPreImages){
            return of(visit_pre_images as any);
        }else if(requestOptions.url == apiDirectory.visitPostImages){
            return of(visit_post_images as any);
        }
        // else if(requestOptions.url == apiDirectory.users){
        //     return of(user_list as any);
        // }
        // else if(requestOptions.url == apiDirectory.user){
        //     return of(single_user as any);
        // }
        else if(requestOptions.url == apiDirectory.beatList){
            return of(beat_list as any);
        }
        
        // return of(null);

        let finalUrl = this.getFinalURL(requestOptions);
        let httpParams = this.getHttpParams(requestOptions.params);
        if (requestOptions.skipAuthHeader) {
            httpParams = httpParams.set('skip-interceptor', 'true');
        }
        let httpHeaders = this.getHeaders(requestOptions.headers);
        let $call: Observable<any>;
        
        switch (requestOptions.responseType) {
            case ResponseType.ARRAY_BUFFER:
                $call = this.httpClient.get(finalUrl, {
                    params: httpParams,
                    headers: httpHeaders,
                    responseType: ResponseType.ARRAY_BUFFER
                });
                break;
            case ResponseType.TEXT:
                $call = this.httpClient.get(finalUrl, {
                    params: httpParams,
                    headers: httpHeaders,
                    responseType: ResponseType.TEXT
                });
                break;

            case ResponseType.BLOB:
                $call = this.httpClient.get(finalUrl, {
                    params: httpParams,
                    headers: httpHeaders,
                    responseType: ResponseType.BLOB
                });
                break;

            default:
                $call = this.httpClient.get(finalUrl, {
                    params: httpParams,
                    headers: httpHeaders,
                });
                break;
        }
        return $call.pipe(catchError(this.handleError));
    }

    public executeGet(requestOptions: Request): Observable<any> {
        
        return this.get<any>(requestOptions);
    }

    public executePost<T>(request: PostRequest<T>): Observable<any> {
        let finalUrl = this.getFinalURL(request);
        let httpParams = this.getHttpParams(request.params);
        let httpHeaders = this.getHeaders(request.headers);
        //Hack to allow multipart form data
        if (request.body instanceof FormData) {
            httpHeaders = httpHeaders.delete('Content-Type');
        }
        return this.httpClient.post(finalUrl, request.body, {
            params: httpParams,
            headers: httpHeaders
        }).pipe(catchError(this.handleError));
    }

    public executePut<T>(request: PostRequest<T>): Observable<any> {
        let finalUrl = this.getFinalURL(request);
        let httpParams = this.getHttpParams(request.params);
        let httpHeaders = this.getHeaders(request.headers);
        if (request.body instanceof FormData) {
            httpHeaders = httpHeaders.delete('Content-Type');
        }
        return this.httpClient.put(finalUrl, request.body, {
            params: httpParams,
            headers: httpHeaders
        }).pipe(catchError(this.handleError));
    }

    public executePatch<T>(request: PostRequest<T>): Observable<any> {
        let finalUrl = this.getFinalURL(request);
        let httpParams = this.getHttpParams(request.params);
        let httpHeaders = this.getHeaders(request.headers);
        if (request.body instanceof FormData) {
            httpHeaders = httpHeaders.delete('Content-Type');
        }
        return this.httpClient.patch(finalUrl, request.body, {
            params: httpParams,
            headers: httpHeaders
        }).pipe(catchError(this.handleError));
    }

    public executeDelete<T>(request: Request): Observable<T> {
        let finalUrl = this.getFinalURL(request);
        let httpParams = this.getHttpParams(request.params);
        let httpHeaders = this.getHeaders(request.headers);
        return this.httpClient.delete(finalUrl, {
            params: httpParams,
            headers: httpHeaders
        }).pipe(catchError(this.handleError)) as Observable<T>;
    }

    public getHttpParams(params: Map<string, string>): HttpParams {
        let httpParams = new HttpParams();
        if (params && params.size > 0) {
            params.forEach((value, key) => {
                if (isNotNull(value)) {
                    httpParams = httpParams.append(key, value);
                }
            });
        }
        return httpParams;
    }

    public getHeaders(values: Map<string, string>): HttpHeaders {
        let headers: HttpHeaders = this.getBasicHeaders();
        if (values && values.size > 0) {
            values.forEach((value, key) => {
                if (isNotBlank(value)) {
                    headers = headers.append(key, value);
                } else {
                    headers = headers.delete(key);
                }
            });
        }
        return headers;
    }

    public getBasicHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        return headers
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json')
            .append('client', 'Rainbow Portal')
            .append('app-version', environment.version)
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}

export interface Request {
    url: string;
    params?: Map<string, any>;
    headers?: Map<string, string>;
    responseType?: ResponseType;
    isAbsoluleURL?: boolean;
    skipAuthHeader?: boolean;
}

export interface PostRequest<T> extends Request {
    body: T;
}

export enum ResponseType {
    ARRAY_BUFFER = "arraybuffer",
    BLOB = "blob",
    JSON = "json",
    TEXT = "text",
}