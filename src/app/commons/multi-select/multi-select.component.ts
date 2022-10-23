import { VisitFilter } from './../../visits/visit.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { Observable, interval, Subscription, of } from 'rxjs';
import { BaseAPI } from 'src/app/services/api/base.api';
import { FormControl } from '@angular/forms';
import { startWith, map, filter, debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { isNotBlank, isFunction, isEmpty, isBlank } from 'src/app/utils/utils-function';
import { BodyComponent } from '../body/body.component';
import { apiDirectory } from 'src/global';

@Component({
  selector: 'adj-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {


  @Input()
  public name: string;

  @Input()
  public multiple: boolean = true

  @Input()
  public display: string = 'search'

  @Input()
  public url: string;

  @Input()
  public chips: boolean = true;

  @Input()
  public params: Map<string, any>;

  public data: Array<any>;

  @Input('data')
  public set setData(values) {
    // console.log(values)
      this.data = values;
      this.selectedValues = this.data;
      this.selected.emit(this.selectedValues);

      // this.handleSeletedItems();
    
   
  }

  @Input()
  public idPropName: string = 'id';

  @Input()
  public labelPropName: string = 'name';

  @Input()
  public type: string = 'local';

  @Input()
  public filter: Function = (term: string, item: any): boolean => {
    const labelProp = item[this.labelPropName] as string;
    const result = labelProp.toLowerCase().startsWith(term.toLowerCase());
    return result;
  }

  public filterdata: VisitFilter

  @Input()
  public mapFn: Function;

  @Input()
  public placeHolder: string = ''

  @Output('selected')
  public selected: EventEmitter<any> = new EventEmitter<any>();

  @Input('viewTemplate')
  public viewTemplate: TemplateRef<any>;

  public results: Array<any>;
  public data$: Observable<any>;
  public searchControl: FormControl;
  public showResponse: boolean;

  public selectedValues: Array<any> = new Array<any>();
  public singleSelect: any = null;
  private subscription: Subscription;
  private localDataSub: Subscription;

  @ViewChild(BodyComponent)
  private body: BodyComponent;

  public apiDirectory: any = apiDirectory;

  public disabled: boolean;

  public disabledMessage: string = 'Input is disabled';

  constructor(private api: BaseAPI, private elementRef: ElementRef) {
    this.apiDirectory = apiDirectory
  }

  @Input('current')
  public set existingValues(values: Array<any> | any) {
    if (values instanceof Array) {
      this.selectedValues = values.map(v => {
        v = { ...v };
        v.isChecked = true;
        return v;
      });
      this.handleSeletedItems();
      return;
    }
    if (values) {
      this.singleSelect = { ...values };
      this.selectedValues = [this.singleSelect]
    }
    console.log(this.selectedValues)
    this.handleSeletedItems();
    return;
  }

  private handleSeletedItems(): void {
    console.log(this.results)
    if (this.results) {
      this.results.forEach(r => {
        if (this.selectedValues) {
          const e = this.selectedValues.find(s => s[this.idPropName] == r[this.idPropName]);
          if (e) {
            r.isChecked = true;
          } else {
            r.isChecked = false;
          }
        }
      })
    }
  }

  public handleRemove(event: Event) {
    if (isEmpty(this.searchControl.value)) {
      if (this.multiple && this.selectedValues.length > 0) {
        const item = this.selectedValues.pop();
        item.isChecked = false;
        this.handleEvents();
      }
    }
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.subscription = this.setupSearch(this.searchControl);
    if (this.type == 'local') {
      this.localDataSub = this.setupLocalData(this.searchControl);
    }
    // this.handleEvents();

    // if (this.singleSelect && !this.multiple) {
    //   this.selectedValues.push(this.singleSelect);
    // }
  }

  public reset(): void {
    if(this.selectedValues) {
      this.selectedValues.forEach(item => {
        item.isChecked = false;
      });
    }
   
    this.selectedValues = new Array<any>();
    this.singleSelect = null;
    if (this.type == 'server') {
      this.results = null;
    }
    this.closePanel();
  }

  private setupLocalData(formContrl: FormControl): Subscription {
    this.results = this.data;
    const subscription = formContrl.valueChanges.pipe(
      startWith(""),
      map(value => value.trim()),
      filter(value => isBlank(value)),
      debounce(() => interval(250))).subscribe(res => {
        this.results = this.data;
        if (this.body) {
          this.body.emptyResponse = false;
        }
      });
    return subscription;
  }

  private setupSearch(formContrl: FormControl): Subscription {
    this.data$ = this.setupServerSearch(formContrl);
    const subscription = this.data$.subscribe(response => {
      this.results = response;
      // if (isEmpty(this.results)) {
      //   this.body.emptyResponse = true;
      // }
      // this.body.completeLoading();
    })
    return subscription;
  }

  private setupServerSearch(formControl: FormControl): Observable<any> {
    return formControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value == 'string') ? value.trim() : ''),
      filter(value => isNotBlank(value)),
      debounce(() => interval(250)),
      distinctUntilChanged(),
      switchMap((value: string) => {
        // this.body.startLoading();
        return this.serverSearch(value);
      }),
      map((response: any) => {
        if (isFunction(this.mapFn)) {
          const result = this.mapFn(response)
          return result;
        }
        return (response && response.results) ? response.results : Array.isArray(response) ? response : [];
      }),
      map((results: Array<any>) => {
        return results.map(option => {
          const selObj = this.selectedValues.find(o => o[this.idPropName] == option[this.idPropName])
          return (selObj) ? selObj : option;
        })
      })
    )
  }

  private localData(searchTerm: string): Observable<any> {
    const result = (this.data) ? of(this.data)
      .pipe(
        map(data => data.filter(o => (this.filter) ? this.filter(searchTerm, o) : true))
      ) : of(null)
    return result;
  }

  private serverSearch(searchTerm: string): Observable<any> {
    const params = new Map<string, string>(this.params);
    params.set('page_size', "50")
    return this.api.executeGet({ url: this.apiDirectory.branchList, params: params })
  }

  public optionClicked(event: Event, option: any): void {
    event.stopPropagation();
  }

  // This is used for single selecte
  public itemSelected(event: Event, option: any): void {
    this.singleSelect = option;
    this.selectedValues = [this.singleSelect];
    this.handleEvents();
    this.closePanel();
  }

  public itemChanged(event: Event, option: any): void {
    console.log(this.selectedValues)
    if (option.isChecked) {
      const index = this.selectedValues.findIndex(value => value[this.idPropName] == option[this.idPropName]);
      if (index < 0) {
        this.selectedValues.push(option);
      }
    } else {
      const index = this.selectedValues.findIndex(value => value[this.idPropName] == option[this.idPropName]);
      if (index > -1) {
        const options = this.selectedValues.splice(index, 1);
        if (options && this.results) {
          options.forEach(o => {
            const record = this.results.find(record => record[this.idPropName] == o[this.idPropName]);
            if (record) {
              record.isChecked = false;
            }
          });
        }
      }
    }
    this.handleEvents();
  }

  public removeItem(event: Event, option: any): void {
    option.isChecked = false;
    if (!this.multiple) {
      this.singleSelect = null;
    }
    this.itemChanged(event, option);
  }

  private handleEvents(): void {
    const val = this.getSelectedValue();
    console.log(val)
    this.selected.emit(val);
  }

  private getSelectedValue(): any {
    const single = (this.singleSelect) ? { ...this.singleSelect } : null;
    const mutliple = (this.selectedValues) ? [...this.selectedValues] : [];
    return (this.multiple) ? mutliple : single;
  }

  public closePanel(): void {
    this.showResponse = false;
  }

  @HostListener('document:click', ['$event'])
  public handleFocusout(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closePanel();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.localDataSub) {
      this.localDataSub.unsubscribe();
    }
  }
}