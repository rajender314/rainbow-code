import { BehaviorSubject, Subject } from "rxjs";
import { BaseAPI } from "src/app/services/api/base.api";
import { isNull } from "src/app/utils/utils-function";
import { PaginatedResponse } from "../models/common.models";

export abstract class AbstractDataService<T>{

    private _loading$: Subject<boolean>;
    private _error$: Subject<any>;
    private _data$: Subject<T>;
    private _list$: Subject<Array<T>>;
    private _paginatedList$: Subject<PaginatedResponse<T>>;
    private _listComplete$: Subject<boolean>;
    private filters: Map<string, any>;
    private id: string;

    constructor(private baseAPI: BaseAPI, private url: string) {
        this._loading$ = new Subject();
        this._error$ = new Subject();
        this._data$ = new Subject();
    }

    public abstract getURL(): string

    public abstract map(item: any): T

    public get loading$() {
        return this._loading$.asObservable()
    }

    public get error$() {
        return this._error$.asObservable()
    }

    public get item$() {
        return this._data$.asObservable()
    }

    public get list$() {
        return this._list$.asObservable()
    }

    public get paginatedList$() {
        return this._paginatedList$.asObservable()
    }

    public get isDone$() {
        return this._listComplete$.asObservable()
    }

    public queueEvent(
        event: 'GET' | 'LIST' | 'PAGINATED_LIST',
        params?: Map<string, any>) {

        switch (event) {
            case 'PAGINATED_LIST':
                this.executePaginatedList(params);
                break;

            case 'GET':
                this.executeGet(params.get('id'));
                break;
        }
    }

    public mapPaginatedResponse(response: PaginatedResponse<T>): Array<T> {
        return response.results;
    }

    private executeGet(id: string): void {
        this._loading$.next(true);
        this.id = id;
        this.baseAPI.get<T>({
            url: `${this.url}${id}`
        }).subscribe(
            response => {
                this._data$.next(response);
                this._loading$.next(false);
            },
            error => {
                this._loading$.next(false);
                this._error$.next(error);
            })
    }

    private executePaginatedList(params: Map<string, any>): void {
        this._loading$.next(true);
        this.filters = params;
        this.baseAPI.get<PaginatedResponse<T>>({
            url: this.url,
            params: params
        }).subscribe((paginatedResponse: PaginatedResponse<T>) => {
            this._paginatedList$.next(paginatedResponse);
            this._loading$.next(false);
            if (isNull(paginatedResponse) || paginatedResponse.page.current_page >= paginatedResponse.page.total_pages) {
                this._listComplete$.next(true)
            }
        }, error => {
            this._loading$.next(false);
            this._error$.next(error);
        })
    }
}