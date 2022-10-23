import { Component, OnInit, Inject } from '@angular/core';
import { BaseAPI } from 'src/app/services/api/base.api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIActionParams } from '../models/common.models';
import { LoadingController } from '@ionic/angular';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { Task } from 'src/models/app.models';
import { apiDirectory } from 'src/global';
import { mapOf } from 'src/app/utils/utils-function';
import { Observable } from 'rxjs';
import { PopoverService } from '../services/popover.service';

@Component({
  selector: 'adj-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent implements OnInit {

  public task: Task;
  public formGroup: FormGroup;
  public historicalTasks: Array<Task>;

  constructor(
    private baseAPI: BaseAPI, private formBuilder: FormBuilder,
    @Inject(ACTION_PARAMS) private inputData: UIActionParams,
    private loading: LoadingController, private popover: PopoverService) {
    this.task = this.inputData.data.parameters.task
  }

  ngOnInit() {
    const formGroup = {}
    this.task.form.fields.forEach(field => {
      formGroup[field.field_name] = [""];
      if (field.required) {
        formGroup[field.field_name].push([Validators.required])
      }
    })
    this.formGroup = this.formBuilder.group(formGroup)
    this.loadInstanceHistory(this.task.instance.id).subscribe(response => {
      this.historicalTasks = response;
    })
  }

  public keys(data: any) {
    return Object.keys(data)
  }

  public async submitForm() {
    if (this.formGroup.valid) {
      const body = { ...this.formGroup.value }
      const loadingCntrl = await this.loading.create({ message: 'Submitting...' })
      loadingCntrl.present();
      this.baseAPI.executePost({
        url: "",//apiDirectory.userTasks,
        body: body,
        params: mapOf({ key: 'task_id', value: this.task.id })
      }).subscribe(response => {
        loadingCntrl.dismiss();
        this.close(this.task, 'selected')
        this.popover.showToast('The task has been submitted successfully', 2000, ['success-toast'])
      }, error => {
        console.log(error);
        loadingCntrl.dismiss();
        this.popover.showToast('The task could not be submitted, please check the input or try again later', 2000, ['error-toast'])

      });
    }
  }

  public close(task: Task = null, role: string = "close"): void {
    this.inputData.data.onClose(task, role);
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

}
