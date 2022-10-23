import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BodyComponent } from 'src/app/commons/body/body.component';
import { getQualifiedContactNumber, isEmpty, pluck } from 'src/app/utils/utils-function';
import { VIEW_MODE, EDIT_MODE } from 'src/constants';
import { apiDirectory } from 'src/global';
import { UserDetail } from 'src/models/app.models';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'adj-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent extends AddUserComponent implements OnInit {

  public title: string;
  public user: UserDetail;
  public mode: string = VIEW_MODE;
  public formGroup: FormGroup;
  public VIEW_MODE: string = VIEW_MODE;
  public EDIT_MODE: string = EDIT_MODE;

  @ViewChild(BodyComponent, { read: BodyComponent })
  private body: BodyComponent;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const mode = this.inputData.data.parameters.mode;
      this.mode = (mode) ? mode : VIEW_MODE;
      const userId = this.inputData.data.parameters.userId;
      if (userId) {
        this.loadUserInfo(userId);
      }
    }, 10);
  }

  private loadUserInfo(userId: number) {
    // this.body.startLoading();
    const url = `${apiDirectory.user}`;
    // const url = `${apiDirectory.users}${userId}/`;
    this.baseAPI.get<UserDetail>({ url: url }).pipe(map(user => {
      if (this.settings && this.settings.country_code) {
        const countryCode = this.settings.country_code;
        const mobileNumber = getQualifiedContactNumber(countryCode, user.mobile_number);
        return { ...user, mobile_number: mobileNumber };
      }
      return user;
    }))
      .subscribe((user: UserDetail) => {
        this.user = user;
        this.formGroup = this.reIntialiseForm();
        // this.body.completeLoading();
        if (this.mode == EDIT_MODE) {
          setTimeout(() => {
            this.initaliseMultiselect();
          }, 10);
        }
      }, error => this.body.error = error)
  }

  protected reIntialiseForm(): FormGroup {
    console.log("Reinitialise Form"+JSON.stringify(this.user.name));
    return this.formBuilder.group({
      user_id: [this.user.user_id, Validators.required],
      name: [this.user.name, Validators.required],
      role_id: [pluck(this.user.role, "id"), Validators.required],
      place_name: [this.user.place.name, Validators.required],
      mobile_number: [this.user.mobile_number, [Validators.required]],
      date_joined: [this.user.date_joined,[Validators.required]],
      device_id:[this.user.device_id,[Validators.required]],
      manager:[this.user.name,[Validators.required]],
      is_active: [{ value: this.user.is_active, disabled: this.mode == VIEW_MODE }],
      groups: this.formBuilder.array(
        isEmpty(this.user.groups) ? [] : this.user.groups.map(group => this.formBuilder.group(group))
      ),
      role_name: [pluck(this.user.role, 'name')],
      group_names: [isEmpty(this.user.groups) ? "" : this.user.groups.map(group => group.name).join()],
    });
  }

  private initaliseMultiselect(): void {
    console.log("LOC 504");
    
    const role = this.user.role;
    const selRole = (role) ? { ...role, role_id: role.id, role_name: role.name } : null;
    if (this.roleMS) {
      this.roleMS.existingValues = selRole
      this.handleRoleSelection(selRole);
    } else {
      console.log('roleMS not inisitalized')
    }

    if (this.locationMS) {
      this.locationMS.existingValues = this.user.place;
      this.locationControl.setValue(this.user.place.id);
    } else {
      console.log('locationMS not inisitalized')
    }

    if (this.groupMS) {
      this.groupMS.existingValues = [...this.user.groups]
    } else {
      console.log('groupsMS not inisitalized')
    }
  }

  public async submitForm() {
    if (this.formGroup.valid) {
      const formData = this.getData();
      const loading = await this.loadingCntrl.create({ message: 'Submitting...' })
      loading.present();
      this.baseAPI.executePatch({
        url: `${apiDirectory.user}${this.user.id}/`,
        body: formData
      }).subscribe(response => {
        loading.dismiss();
        this.close(response, 'selected');
        this.popoverService.showToast("The user has been updated successfully.", 1500, ['success-toast'])
      }, error => {
        console.log(error);
        loading.dismiss();
        this.popoverService.showToast("The user could not be updated. Please try later.", 1500, ['error-toast'])
      })
    }
  }

}
