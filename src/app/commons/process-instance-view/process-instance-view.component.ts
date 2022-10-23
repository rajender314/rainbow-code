import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UIActionParams } from '../models/common.models';
import { BaseAPI } from 'src/app/services/api/base.api';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { ProcessInstance, Task } from 'src/models/app.models';
import { Observable } from 'rxjs';
import { apiDirectory } from 'src/global';
import { mapOf, isEmpty } from 'src/app/utils/utils-function';
import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'adj-process-instance-view',
  templateUrl: './process-instance-view.component.html',
  styleUrls: ['./process-instance-view.component.scss'],
})
export class ProcessInstanceViewComponent implements OnInit {

  public instance: ProcessInstance;
  public tasks: Array<Task>;

  @ViewChild(BodyComponent)
  private body: BodyComponent

  constructor(private baseAPI: BaseAPI, @Inject(ACTION_PARAMS) private inputData: UIActionParams) {
    this.instance = this.inputData.data.parameters.instance
  }

  public keys(data: any) {
    return Object.keys(data)
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const task$ = this.loadInstanceHistory(this.instance.id);
      this.body.startLoading();
      task$.subscribe(response => {
        this.tasks = response;
        this.body.completeLoading();
        if (isEmpty(this.tasks)) {
          this.body.emptyResponse = true
        }
      }, error => this.body.error = error)
    }, 10)
  }

  private loadInstanceHistory(instanceId: number): Observable<Task[]> {
    return this.baseAPI.executeGet({
      url: "",//apiDirectory.instanceHistory,
      params: mapOf(
        { key: 'instance_id', value: instanceId.toString() },
        { key: 'status', value: 'COMPLETED' }
      )
    })
  }

  public close(task: Task = null, role: string = "close"): void {
    this.inputData.data.onClose(task, role);
  }

}
