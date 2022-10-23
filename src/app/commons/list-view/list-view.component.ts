import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNotNull, isNull, isEmpty } from 'src/app/utils/utils-function';
import { BodyComponent } from '../body/body.component';
import { Page } from '../models/common.models';

@UntilDestroy()
@Component({
  selector: 'adj-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewComponent {

  @Input('smTemplate')
  public smTemplate: TemplateRef<any>;

  @Input('lgTemplate')
  public lgTemplate: TemplateRef<any>;

  @Input('elements')
  public set setElements(elements: Array<any>) {
    this.list = elements;
    if (isEmpty(this.list)) {
      this.setEmtpyRespone();
    }
  }

  @Input('error')
  public set onError(error: any) {
    if (isNotNull(error)) {
      this.error$.next(error);
    }
  }

  @Input('page')
  public set page(page: Page) {
    this.currentPage = page;
    if (isNull(this.currentPage) || this.isLastPage(this.currentPage)) {
      this.disableInfiniteScrolling(this.infiniteScroll);
    }

    if (isNull(this.currentPage)) {
      this.setEmtpyRespone();
    }
  }

  @Input('loading')
  public set onLoading(loading: boolean) {
    console.log('onloading function', loading);
    this.loading$.next(loading);
  }

  @Output('loadMore')
  private loadMoreEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(BodyComponent)
  private loadingBody: BodyComponent;

  @ViewChild(IonInfiniteScroll)
  private infiniteScroll: IonInfiniteScroll;

  private loading$: BehaviorSubject<boolean>;
  private error$: BehaviorSubject<any>;

  public list: Array<any>;
  public currentPage: Page;

  constructor() {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.error$ = new BehaviorSubject<boolean>(null);
  }

  public loadMore(event: Event): void {
    console.log(event);
    const pageNumber = (isNull(this.currentPage)) ? 1 : this.currentPage.next_page;
    if (this.hasMoreElements()) {
      this.loadMoreEvent.emit({ currentPage: this.currentPage, nextPage: pageNumber })
    } else {
      this.disableInfiniteScrolling(this.infiniteScroll);
    }
  }

  private setEmtpyRespone(): void {
    if (this.loadingBody) {
      this.loadingBody.emptyResponse = true;
    }
  }

  public ngAfterViewInit(): void {
    this.loading$.asObservable().pipe(untilDestroyed(this)).subscribe(loading => {
      setTimeout(() => {
        this.handleLoading(loading)
      });
    })
    this.error$.asObservable().pipe(untilDestroyed(this)).subscribe(error => {
      setTimeout(() => {
        this.handleError(error)
      });
    })
  }

  private handleLoading(loading: boolean): void {
    if (this.loadingBody && loading != undefined) {
      if (loading) {
        this.loadingBody.startLoading();
      } else {
        this.loadingBody.completeLoading();
      }
    }

  }

  private handleError(error: any) {
    if (isNotNull(error) && isNull(this.currentPage) && this.loadingBody) {
      this.loadingBody.error = error;
    }
  }

  private hasMoreElements(): boolean {
    return isNotNull(this.currentPage) && (this.currentPage.current_page < this.currentPage.total_pages);
  }

  private disableInfiniteScrolling(infiniteScroll: IonInfiniteScroll) {
    if (infiniteScroll) {
      infiniteScroll.disabled = true;
    }
  }

  private isLastPage(page: Page) {
    return (isNull(page)) ? true : page.current_page == page.total_pages;
  }

}
