import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIActionParams } from '../models/common.models';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { Task } from 'src/models/app.models';
import { toCamelCase } from 'src/app/utils/utils-function';

@Component({
  selector: 'adj-process-form',
  templateUrl: './process-form-view.component.html',
  styleUrls: ['./process-form-view.component.scss'],
})
export class ProcessFormViewComponent implements OnInit {

  public task: Task;
  public formGroup: FormGroup;

  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams,
    private formBuilder: FormBuilder) {
    this.task = this.inputData.data.parameters.task
  }

  ngOnInit() {
    const formGroup = {}
    this.task.form.fields.forEach(field => {
      formGroup[field.field_name] = [this.task.data[field.field_name]];
      if (field.required) {
        formGroup[field.field_name].push([Validators.required])
      }
    })
    this.formGroup = this.formBuilder.group(formGroup)
    // this.formGroup.disable();
  }

  public toCamelcase(value: string): string {
    return toCamelCase(value, "_")
  }

  public keys(data: any) {
    return Object.keys(data)
  }

  public close(task: Task = null, role: string = "close"): void {
    this.inputData.data.onClose(task, role);
  }

}
