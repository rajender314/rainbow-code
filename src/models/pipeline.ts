import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Request, BaseAPI } from 'src/app/services/api/base.api';
import { mergeMapEntries } from 'src/app/utils/utils-function';

export interface Flow<T, K> {

    get(params: Map<string, any>, feed: K): Observable<T>;
    name(): string;
    clone(params: Map<string, any>, feed: K): Flow<T, K>
}


export class ServerFlow<T, K> implements Flow<T, K> {

    constructor(
        private _name: string, private api: BaseAPI,
        private request: Request,
        private feedFn: (params: Map<string, any>, feed: K) => Map<string, any>) {
    }

    public get(params: Map<string, any>, feed: K): Observable<T> {
        const queryParams = this.feedFn(params, feed)
        const request = { ... this.request, params: queryParams }
        return this.api.executeGet(request)
    }

    public name(): string {
        return this._name;
    }

    public clone(params: Map<string, any>, feed: K): Flow<T, K> {
        const queryParams = this.feedFn(params, feed)
        const request = { ...this.request, params: queryParams };
        return new ServerFlow(this.name(), this.api, request, this.feedFn);
    }

}



export class Pipeline<T, K> implements Flow<T, K>{

    private calls: Array<Flow<T, K>>;

    constructor(
        private _name: string,
        private feedMapFn: (response: T) => K,
        private mergeFn: (head: T, ...args: Array<T>) => T) {
        this.calls = [];
    }


    public name(): string {
        return this._name;
    }

    public clone(params: Map<string, any>, feed: K): Flow<T, K> {
        return this;
    }

    public addFlow(flow: Flow<T, K>): Pipeline<T, K> {
        this.calls = [...this.calls];
        this.calls.push(flow);
        return this;
    }

    public get(params: Map<string, any>, feed: K): Observable<T> {
        let head = this.head;
        if (this.head) {
            head = head.clone(params, null);
            const head$ = head.get(params, feed);
            const pipeline = head$.pipe(
                switchMap(headFeed => this.executeFlow(head, headFeed, params)),
                map(response => this.mergeResponse(response))
            )
            return pipeline;
        }
    }

    private mergeResponse(response: any): T {
        const finalResult = new Array<T>();
        const headName = this.head.name();
        const headResponse = response[headName];
        this.calls.filter(flow => flow.name() != headName).forEach(flow => {
            finalResult.push(response[flow.name()]);
        })
        return this.mergeFn(headResponse, ...finalResult);
    }

    private executeFlow(head: Flow<T, K>, feed: T, params: Map<string, any>): Observable<any> {
        const [first, ...flows] = [...this.calls]
        const intitial = {};
        intitial[head.name()] = of(feed);
        const flows$ = flows.reduce((flows, flow) => {
            flows = { ...flows }
            flows[flow.name()] = this.prepareFeed(flow, feed, params);
            return flows;
        }, intitial)
        return forkJoin(flows$)
    }

    private prepareFeed(flow: Flow<T, K>, feed: T, params: Map<string, any>): Observable<T> {
        const clonedFlow = flow.clone(params, this.feedMapFn(feed));
        return clonedFlow.get(params, this.feedMapFn(feed));
    }

    private get head(): Flow<T, K> {
        return this.calls[0]
    }
}



