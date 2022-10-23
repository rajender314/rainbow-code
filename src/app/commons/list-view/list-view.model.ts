import { Observable } from "rxjs";
import { Page } from "../models/common.models";

export interface ListSource<T = any> {

    list(): Observable<T>;
    loading(): Observable<boolean>;
    error(): Observable<any>;
    page(): Observable<Page>;

}