import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNotNull, isNull, isFalse } from 'src/app/utils/utils-function';

@Component({
  selector: 'rainbow-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  public currentState: { loading: boolean, error: any, empty: boolean }
  public loadingBehaviour: BehaviorSubject<boolean>;

  @Input('erTemplate')
  public emptyResponseTemplate: TemplateRef<any>;

  @Input('errorTemplate')
  public errorTemplate: TemplateRef<any>;

  constructor() {
    this.loadingBehaviour = new BehaviorSubject<boolean>(false);
    this.reset();
  }

  ngOnInit() { }

  public reset(): void {
    this.currentState = { loading: false, error: null, empty: false }
    this.loadingBehaviour.next(false);
  }

  public startLoading(): void {
    this.reset();
    this.currentState.loading = true;
    this.loadingBehaviour.next(true);
  }

  public get loading(): Observable<boolean> {
    return this.loadingBehaviour.asObservable();
  }

  public completeLoading(): void {
    this.currentState.loading = false;
    this.loadingBehaviour.next(false);
  }

  public set error(error: any) {
    console.log(error);
    this.completeLoading();
    this.currentState.error = error;
  }

  public get error(): any {
    return this.currentState.error;
  }

  public set emptyResponse(response: boolean) {
    this.completeLoading();
    this.currentState.empty = response;
  }

  public get emptyResponse(): boolean {
    return this.currentState.empty;
  }


  public get shouldShowBody(): boolean {
    const loading = this.loadingBehaviour.getValue();
    return isFalse(loading) && isFalse(this.emptyResponse) && isNull(this.error);
  }

}