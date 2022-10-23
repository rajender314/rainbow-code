import { Component, OnInit } from '@angular/core';
import { UserTaskListComponent } from 'src/app/commons/user-task-list/user-task-list.component';
import { mapOf } from 'src/app/utils/utils-function';

@Component({
  selector: 'adj-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent extends UserTaskListComponent {

  
  public getParams(): Map<string, string> {
    const statusName = this.status.value == 'all' ? null : this.status.value
    return mapOf(
      { key: 'status', value: statusName },
      { key: 'process_type', value: 'transaction' })
  }

  public ngAfterViewInit(): void {
    this.refresh();
  }


}
