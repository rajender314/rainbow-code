import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseAPI } from 'src/app/services/api/base.api';
import { requiredFileType } from 'src/app/utils/app.form.validators';
import { retrieveErrorMessage } from 'src/app/utils/utils-function';
import { ERROR_TOAST_CLASS, SUCCESS_TOAST_CLASS } from 'src/constants';
import { UIActionParams } from '../models/common.models';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { PopoverService } from '../services/popover.service';

@Component({
  selector: 'adj-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss'],
})
export class ImportDataComponent implements OnInit {

  public title: string;
  public contentLoading: string;
  public defaultError: string;
  public url: string;
  public params: Map<string, any>;
  public successMessage: string;
  public formGroup: FormGroup;
  public fileType: string;

  constructor(
    private baseAPI: BaseAPI,
    private popover: PopoverService,
    private formBuilder: FormBuilder,
    @Inject(ACTION_PARAMS) private inputData: UIActionParams) { }

  ngOnInit() {
    const parameters = this.inputData.data.parameters;
    this.title = parameters.title;
    this.contentLoading = parameters.contentLoading;
    this.defaultError = parameters.defaultError;
    this.url = parameters.url;
    this.successMessage = parameters.successMessage;
    this.fileType = parameters.fileType;
    this.formGroup = this.formBuilder.group({
      file: ["", [Validators.required, requiredFileType(this.fileType)]]
    })
  }

  public close(item: any = null, role: string = "closed"): void {
    this.inputData.data.onClose(item, role);
  }

  public get fileControl(): AbstractControl {
    return this.formGroup.get('file');
  }

  public async submit() {
    this.formGroup.markAllAsTouched();
    this.formGroup.markAsDirty();
    console.log(this.formGroup.valid);
    console.log(this.formGroup);
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('file', this.formGroup.value.file);
      const loading = await this.popover.loadingController.create({ message: this.contentLoading });
      loading.present();
      this.baseAPI.executePost<any>({
        url: this.url,
        params: this.params,
        body: formData
      }).subscribe(response => {
        loading.dismiss();
        this.close(response, 'selected');
        this.popover.showToast(this.successMessage, 1500, [SUCCESS_TOAST_CLASS]);
      }, error => {
        loading.dismiss();
        const errorMessages = retrieveErrorMessage(error, this.defaultError);
        this.popover.showToast(errorMessages.join(", "), 1500, [ERROR_TOAST_CLASS]);
      });
    } else {
      this.popover.showToast('Correct form error and submit again!', 1500, [ERROR_TOAST_CLASS]);
    }
  }

}
