import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericListComponentComponent } from 'src/app/commons/generic-list-component/generic-list-component.component';
import { PaginatedListConfig } from 'src/app/commons/paginated-list/paginated-list.component';
import { isNotBlank } from 'src/app/utils/utils-function';
import { FROM_DATE, SEARCH, STATUS, TO_DATE } from 'src/constants';
import { apiDirectory } from 'src/global';
import { Status, StoreDetails } from 'src/models/app.models';

@Component({
  selector: 'adj-beat-list',
  templateUrl: './beat-list.component.html',
  styleUrls: ['./beat-list.component.scss'],
})
export class BeatListComponent extends GenericListComponentComponent<StoreDetails> implements OnInit {

  public status: Status;
  public searchInput: FormControl;
  public selectAll: boolean;
  

  ngOnInit(): void {
    super.ngOnInit();
    this.searchInput = new FormControl();
    this.status = { value: true, label: 'Active', name: 'status' }
  }

  ngAfterViewInit(): void {
    this.refresh();
  }


  public getListConfig(): PaginatedListConfig {
    return { url: apiDirectory.beatsList };
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

}
