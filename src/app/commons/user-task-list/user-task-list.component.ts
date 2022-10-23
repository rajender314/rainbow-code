import { Component } from '@angular/core';
import { mapOf } from 'src/app/utils/utils-function';
import { apiDirectory } from 'src/global';
import { Task } from 'src/models/app.models';
import { GenericListComponentComponent } from '../generic-list-component/generic-list-component.component';
import { Option } from '../models/common.models';
import { PaginatedListConfig } from '../paginated-list/paginated-list.component';
import { ProcessFormViewComponent } from '../process-form-view/process-form-view.component';
import { ProcessFormComponent } from '../process-form/process-form.component';

@Component({
  selector: 'adj-user-task-list',
  templateUrl: './user-task-list.component.html',
  styleUrls: ['./user-task-list.component.scss'],
})
export abstract class UserTaskListComponent extends GenericListComponentComponent<Task> {

  public status: Option<string>;
  private COMPLETED_STATUS: string = 'COMPLETED'
  private PENDING_STATUS: string = 'PENDING'
  private ALL_STATUS: string = 'all'

  public ngOnInit(): void {
    super.ngOnInit();
    this.status = { label: 'Pending', value: 'PENDING', icon: 'ellipsis-horizontal-circle-outline' }
  }

  public getParams(): Map<string, string> {
    const statusName = this.status.value == this.ALL_STATUS ? null : this.status.value
    return mapOf(
      { key: 'status', value: statusName })
  }

  public showStatusOptions($event: Event): void {
    this.popover.showActions({
      event: $event,
      params: {
        options: [
          { label: 'All', value: this.ALL_STATUS, icon: "list-circle-outline" },
          { label: 'Completed', value: this.COMPLETED_STATUS, icon: "checkmark-circle-outline" },
          { label: 'Pending', value: this.PENDING_STATUS, icon: 'ellipsis-horizontal-circle-outline' },
        ],
        selectedValue: this.status
      },
      selectHandler: (option: Option<string>) => {
        this.status = option;
        this.refresh();
      }
    })
  }

  public mapData(task: any): Task {
    return task;
  }

  public getListConfig(): PaginatedListConfig {
    return { url: apiDirectory.storesList }
  }

  public isAutoReload(): boolean {
    return false;
  }

  public completeTask(event: Event, task: Task): void {
    event.stopPropagation();
    const classes = this.getFormClass(task);
    const component = this.getTaskFrom(task);
    this.modalService.showModal({
      component: component,
      params: {
        task: task
      },
      event: event,
      cssClasses: classes,
      selectHandler: (response: Task) => {
        console.log(response);
        this.refresh();
      }
    });
  }

  public viewTask(event: Event, task: Task): void {
    event.stopPropagation();
    this.modalService.showModal({
      component: ProcessFormViewComponent,
      params: {
        task: task
      },
      event: event,
    });
  }


  public showAction(event: Event, task: Task): void {
    if (task.status == this.COMPLETED_STATUS) {
      this.viewTask(event, task);
    } else {
      this.completeTask(event, task);
    }
  }

  public getTaskFrom(task: Task): any {
    return ProcessFormComponent;
  }

  public getFormClass(task: Task): Array<string> {
    return [''];
  }
}
