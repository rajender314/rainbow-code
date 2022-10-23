import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UIActionParams } from 'src/app/commons/models/common.models';
import { ACTION_PARAMS } from 'src/app/commons/services/data-provider.service';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { SNAKE_BAR_TIMEOUT } from 'src/constants';
import { apiDirectory } from 'src/global';
import { UserDetail } from 'src/models/app.models';

@Component({
  selector: 'adj-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {

  private user: UserDetail;
  public formGroup: FormGroup;

  constructor(
    protected baseAPI: BaseAPI,
    protected loadingCntrl: LoadingController,
    protected formBuilder: FormBuilder,
    protected popoverService: PopoverService,
    @Inject(ACTION_PARAMS) protected inputData: UIActionParams) { }

  ngOnInit() {
    this.user = this.inputData.data.parameters.user;
    this.formGroup = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      user_id: [this.user.user_id, Validators.required],
      password: ["", Validators.required]
    });
  }

  ngAfterViewInit(): void {

  }

  public close(response: any = null, status: string = 'closed'): void {
    this.inputData.data.onClose(null, status);
  }

  public async submitForm() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const loading = await this.loadingCntrl.create({ message: 'Submitting...' })
      loading.present();
      this.baseAPI.executePatch({
        url: `${apiDirectory.user}${this.user.id}/`,
        body: this.formGroup.value
      }).subscribe(response => {
        loading.dismiss();
        this.close(response, 'selected');
        this.popoverService.showToast("The password has been updated successfully.", SNAKE_BAR_TIMEOUT, ['success-toast'])
      }, error => {
        console.log(error);
        loading.dismiss();
        this.popoverService.showToast("The password could not be updated. Please try later.", SNAKE_BAR_TIMEOUT, ['error-toast'])
      })
    }
  }

}
