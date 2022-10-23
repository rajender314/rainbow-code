import { EntityState, Query, QueryEntity } from "@datorama/akita";
import { combineLatest, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { isNotNull, isNull, isEmpty } from "src/app/utils/utils-function";
import { Page, PaginatedResponse } from "../models/common.models";

export class PaginatedListSupport<K, T extends QueryEntity<EntityState<K, number>>> {

    public list$: Observable<Array<K>>;
    public loading$: Observable<boolean>;
    public loadingMore$: Observable<boolean>;
    public error$: Observable<any>;
    public currentPage: Observable<Page>;

    constructor(private query: T) {
        this.setup()
    }

    private setup(): void {
        this.list$ = this.query.selectAll()
        this.loading$ = this.query.selectLoading();
        this.currentPage = this.query.select('page');
        this.loadingMore$ = combineLatest([this.loading$, this.query.select('page')])
            .pipe(mergeMap(([loading, page]) => {
                return isNotNull(page) ? of(false) : of(loading)
            }))
        this.error$ = this.query.selectError();
    }

    public loadInitalState(loadFunction: Function): void {
        const currentState = (this.query.getValue() as any)
        if (isNull(currentState) || isNull(currentState.page)) {
            if (loadFunction) {
                loadFunction();
            }
        }
    }
}