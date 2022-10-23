import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericListComponentComponent } from 'src/app/commons/generic-list-component/generic-list-component.component';
import { DateUtil } from 'src/app/commons/models/date.models';
import { PaginatedListConfig } from 'src/app/commons/paginated-list/paginated-list.component';
import { isNotBlank, isNotEmpty } from 'src/app/utils/utils-function';
import { FROM_DATE, SEARCH, STATUS, TO_DATE } from 'src/constants';
import { apiDirectory } from 'src/global';
import { Status, StoreDetails } from 'src/models/app.models';

@Component({
  selector: 'adj-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss'],
})
export class MerchandiserListComponent extends GenericListComponentComponent<StoreDetails> implements OnInit {

  public status: Status;
  public searchInput: FormControl;
  public selectAll: boolean;
  

  ngOnInit(): void {
    super.ngOnInit();
    this.searchInput = new FormControl();
    this.dateFunction = DateUtil.ALL_DURATION;
    this.status = { value: true, label: 'Active', name: 'status' }
  }

  ngAfterViewInit(): void {
    this.refresh();
  }


  public getListConfig(): PaginatedListConfig {
    return { url: apiDirectory.merchandiserList };
  }

  public isAutoReload(): boolean {
    return false;
  }

  public mapData(instance: StoreDetails): StoreDetails {
    (instance as any).selected = this.selectAll;
    return instance;
  }

  public getParams(): Map<string, string> {
    return new Map<string, string>();
  }

  public handleAllSelectionChange(): void {
    if (this.paginatedList.currentState) {
      const results = this.paginatedList.currentState.results;
      if (isNotEmpty(results)) {
        results.forEach(store => {
          (store as any).selected = this.selectAll;
        })
      }
    }
  }

  public showStatusOptions($event: Event): void {
    this.popover.showStatusOptions($event, this.status, (status: Status) => {
      this.status = { ...status };
      this.refresh();
    })
  }
  
  public clear(): void {
    this.searchInput.reset();
    this.refresh();
  }

  public performSearch(): void{
    this.refresh();
  }
}
