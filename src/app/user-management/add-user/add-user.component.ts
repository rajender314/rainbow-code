import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UIActionParams } from 'src/app/commons/models/common.models';
import { MultiSelectComponent } from 'src/app/commons/multi-select/multi-select.component';
import { ACTION_PARAMS } from 'src/app/commons/services/data-provider.service';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { DATE_FORMAT, isFunction } from 'src/app/utils/utils-function';
import { apiDirectory } from 'src/global';
import { Group, UserDetail, UserSettings } from 'src/models/app.models';
@UntilDestroy()
@Component({
  selector: 'adj-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  public formGroup: FormGroup;
  public roles$: Observable<any>;
  public locations$: Observable<any>;
  public groups$: Observable<any>;
  public apiDirectory: any = apiDirectory;
  public preferredCountry: Array<string>;
  public settings: UserSettings;

  @ViewChild('locations', { read: MultiSelectComponent })
  protected locationMS: MultiSelectComponent;

  @ViewChild('roles', { read: MultiSelectComponent })
  protected roleMS: MultiSelectComponent;

  @ViewChild('groups', { read: MultiSelectComponent })
  protected groupMS: MultiSelectComponent;

  @ViewChild('manager', { read: MultiSelectComponent })
  protected managerMS: MultiSelectComponent;

  constructor(
    protected baseAPI: BaseAPI,
    protected loadingCntrl: LoadingController,
    protected formBuilder: FormBuilder,
    protected popoverService: PopoverService,
    @Inject(ACTION_PARAMS) protected inputData: UIActionParams) {
    this.preferredCountry = ['in'];
  }

  ngOnInit() {
    // this.roles$ = this.baseAPI.executeGet({ url: apiDirectory.roles });
    // this.locations$ = this.baseAPI.executeGet({ url: apiDirectory.placesByLocation });
    // this.groups$ = this.baseAPI.executeGet({ url: apiDirectory.groups });
    this.formGroup = this.intialiseForm();
    this.popoverService.userSettings.settings.pipe(untilDestroyed(this)).subscribe(settings => {
      const country = 'in';//(settings.dial_code) ? settings.dial_code : 'in';
      console.log(country);
      this.preferredCountry = [country.toLowerCase()];
    });
  }

  ngAfterViewInit(): void {
    this.disableLocationSelection();
  }

  protected intialiseForm(): FormGroup {
    return this.formBuilder.group({
      user_id: ["", Validators.required],
      name: ["", Validators.required],
      role_id: ["", Validators.required],
      place_id: ["", Validators.required],
      manager_id: [""],
      mobile_number: ["", [Validators.required]],
      date_joined: [""],
      password: ["", Validators.required],
      groups: this.formBuilder.array([])
    })
  }

  public get mobileControl(): AbstractControl {
    return this.formGroup.get('mobile_number');
  }

  public get roleControl(): AbstractControl {
    return this.formGroup.get('role_id');
  }

  public get locationControl(): AbstractControl {
    return this.formGroup.get('place_id');
  }

  public get groupControl(): AbstractControl {
    return this.formGroup.get('groups');
  }

  public get managerControl(): AbstractControl {
    return this.formGroup.get('manager_id');
  }

  public close(response: any = null, status: string = 'closed'): void {
    this.inputData.data.onClose(response, status);
  }

  protected getData(): any {
    const data = { ...this.formGroup.value };
    data.date_joined == isFunction(data.date_joined.format) ? data.date_joined.format(DATE_FORMAT) + "T00:00" : data.date_joined
    data.groups = data.groups.map(g => g.id);
    return data;
  }

  public async submitForm() {
    if (this.formGroup.valid) {
      const formData = this.getData();
      const loading = await this.loadingCntrl.create({ message: 'Submitting...' })
      loading.present();
      this.baseAPI.executePost({
        url: apiDirectory.user,
        body: formData
      }).subscribe(response => {
        loading.dismiss();
        this.close(response, 'selected');
        this.popoverService.showToast("The user has been created successfully.", 1500, ['success-toast'])
      }, error => {
        console.log(error);
        loading.dismiss();
        this.popoverService.showToast("The user could not be created. Please try later.", 1500, ['error-toast'])
      })
    }
  }

  public handleRoleSelection(role: any): void {
    this.roleControl.markAllAsTouched();
    this.roleControl.setValue((role) ? role.role_id : '');
    this.locationMS.reset();
    this.locationControl.setValue('');
    if (role?.role_id && role?.role_id > 0) {
      this.locationMS.disabled = false;
      this.reloadLocations(role);
    } else {
      this.disableLocationSelection();
    }

  }

  private disableLocationSelection(): void {
    setTimeout(() => {
      this.locationMS.disabled = true;
      this.locationMS.disabledMessage = 'Please select a role to enable location selection';
    })
  }

  protected reloadLocations(role: any): void {
    // this.baseAPI.executeGet({ url: `${apiDirectory.rolesLocation}${role.role_id}/` })
    //   .subscribe(response => {
    //     this.locationMS.setData = response.data;
    //     console.log(this.locationMS);
    //   });
  }

  public handleLocationSelection(location: any): void {
    this.locationControl.markAllAsTouched();
    this.locationControl.setValue(location ? location.id : '');
  }

  public handleGroupSelection(groups: Array<Group>): void {
    const groupControl = this.groupControl as FormArray;
    groupControl.clear();
    (groups as Array<any>).forEach(group => {
      groupControl.push(this.formBuilder.group(group))
    });
    groupControl.markAllAsTouched()
  }

  public handleManagerSelection(manager: UserDetail): void {
    this.managerControl.markAllAsTouched();
    this.managerControl.setValue(manager ? manager.id : '');
  }

}
