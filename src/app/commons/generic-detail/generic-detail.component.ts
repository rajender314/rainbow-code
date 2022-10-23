import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { BaseAPI } from 'src/app/services/api/base.api';
import { AuthenticationService } from 'src/app/services/authentication/auth.service';
// import { OrganisationService } from 'src/app/services/organisation/organisation.service';
import { retrieveErrorMessage } from 'src/app/utils/utils-function';
import { ERROR_TOAST_CLASS, SUCCESS_TOAST_CLASS } from 'src/constants';
import { UIActionParams } from '../models/common.models';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { PopoverService } from '../services/popover.service';

@Component({
  selector: 'adj-generic-detail',
  templateUrl: './generic-detail.component.html',
  styleUrls: ['./generic-detail.component.scss'],
})
export abstract class GenericDetailComponent<T> implements OnInit {

  public title: string;
  public formGroup: FormGroup;
  public mode: string;
  public readOnlyConfig: any;

  protected parameters: any;
  protected object: T;
  protected entityName: string;
  protected apiURL: string
  protected config: any;

  constructor(
    // protected orgService: OrganisationService,
    protected authService: AuthenticationService,
    protected popover: PopoverService,
    protected baseAPI: BaseAPI,
    @Inject(ACTION_PARAMS) protected inputData: UIActionParams,
    protected formBuilder: FormBuilder) {
    console.log(inputData);
    this.parameters = (inputData.data && inputData.data.parameters) ? inputData.data.parameters : {};
  }

  ngOnInit() {
    console.log('calling NG INIT');
    this.title = this.parameters.title;
    this.entityName = this.parameters.entityName;
    this.apiURL = this.parameters.url;
    this.object = (this.parameters.object) ? this.parameters.object : {};
    const objectCache: any = { ...this.object };
    this.mode = this.parameters.mode;
    this.config = (this.parameters.config) ? this.parameters.config : {}
    this.readOnlyConfig = this.defaultReadOnlyConfig(this.parameters.readOnlyAll, this.parameters.config);
    this.formGroup = this.formBuilder.group(this.getFormGroup(objectCache));
  }

  public close(item: any = null, role: string = "closed"): void {
    this.inputData.data.onClose(item, role);
  }

  public async submit() {
    this.formGroup.markAllAsTouched();
    console.log(this.formGroup.value);
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      const config = this.getMessageConfig();
      const loading = await this.popover.loadingController.create({ message: config.loading });
      loading.present();
      const body = this.buildBody({ ...this.formGroup.value });
      const observable = this.isServerRequest() ? this.getObservable(body) : this.localRequest(body);
      observable.subscribe(response => {
        this.onSuccess(response);
        this.close(response, 'selected');
        this.popover.showToast(config.successMessage, 1500, [SUCCESS_TOAST_CLASS]);
        loading.dismiss();
      }, error => {
        this.onError(error);
        const errorMessages = retrieveErrorMessage(error, config.defaultError);
        this.popover.showToast(errorMessages.join(", "), 1500, [ERROR_TOAST_CLASS]);
        loading.dismiss();
      })
    } else {
      this.popover.showToast("Please correct the errors and submit again", 1500, [ERROR_TOAST_CLASS]);
    }
  }

  private getMessageConfig(): { loading: string, successMessage: string, defaultError: string } {
    return {
      loading: (this.mode == 'NEW')
        ? `Creating a new ${this.entityName}...`
        : `Updating the ${this.entityName}...`,
      successMessage: (this.mode == 'NEW')
        ? `The ${this.entityName} has been created successfully.`
        : `The ${this.entityName} has been updated successfully.`,
      defaultError: (this.mode == 'NEW')
        ? `The ${this.entityName} could not be created. Please try later or contact administrator`
        : `The ${this.entityName} could not be updated. Please try later or contact administrator`
    }
  }

  private getObservable(body: any): Observable<any> {
    if (this.mode == 'EDIT') {
      return this.baseAPI.executePut<any>({
        url: this.getPutURL(body),
        body: body
      });
    }
    return this.baseAPI.executePost<any>({
      url: this.getPostURL(body),
      body: body
    });
  }

  public isServerRequest(): boolean {
    return true;
  }

  public localRequest(body: any): Observable<any> {
    return of({});
  }

  public onSuccess(response: any): void {
    console.log('On success not implemented');
  }

  public onError(error: any): void {
    console.log('On error not implemented');
  }

  public getPostURL(body: any): string {
    return `${this.apiURL}`;
  }

  public getPutURL(body: any): string {
    return `${this.apiURL}${body.id}/`;
  }

  protected abstract getFormGroup(source: any): any
  protected abstract defaultReadOnlyConfig(readOnlyall: boolean, readOnlyConfig: any): any
  protected abstract buildBody(source: any): any;
}
