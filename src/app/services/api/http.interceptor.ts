import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { Observable, forkJoin, concat } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/auth.service';
import { isNotBlank } from 'src/app/utils/utils-function';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    public skipInterceptor: string = "skip-interceptor";

    constructor(
        private authService: AuthenticationService) { }

    private handleQueryParams(queryParams: HttpParams): HttpParams {
        let params = new HttpParams()
        queryParams.keys().forEach(key => {
            let paramValue = queryParams.get(key);
            if (Array.isArray(paramValue)) {
                paramValue.forEach(v => {
                    params = params.append(key, v)
                })
            } else {
                params = params.append(key, paramValue)
            }
        })
        return params;
    }

    private shouldApplyInterceptor(queryParams: HttpParams): boolean {
        const skipInterceptor = queryParams.get(this.skipInterceptor)
        if (skipInterceptor && skipInterceptor == "true") {
            return false;
        }
        return true;
    }

    private interceptRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.authToken.pipe(take(1));
        return forkJoin({
            token: token,
        }).pipe(
            mergeMap(response => {
                let headers = req.headers;
                if (isNotBlank(response.token)) {
                    const authorizationHeader = "Token " + response.token
                    headers = headers.set("Authorization", authorizationHeader);
                }
                
                const url = req.url
                let params = this.handleQueryParams(req.params);
                
                const httpReq = req.clone({ headers: headers, url: url, params: params });
                return next.handle(httpReq);
            }
            ));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.shouldApplyInterceptor(req.params)) {
            return this.interceptRequest(req, next)
        }
        return next.handle(req);
    }

}
