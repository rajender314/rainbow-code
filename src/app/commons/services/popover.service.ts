import { Injectable } from '@angular/core';
import { UIAction, Option } from '../models/common.models';
import { OptionsComponent } from '../options/options.component';
import { AlertController, LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { isEmpty, isNull } from '../../utils/utils-function';
import { DateRangeComponent } from '../date-range/date-range-component';
import { DateUtil, DateFunction } from '../models/date.models';
import { BaseUIProvider } from './base-ui-provider.service';
import { ModalService } from './modal-provider.service';
import { Status } from 'src/models/app.models';
import { UserPermissionService } from 'src/app/services/permission/permission.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TemplateProvider } from 'src/app/services/templates/template.service';



@Injectable({
  providedIn: 'root'
})
export class PopoverService extends BaseUIProvider {
 
  constructor(
    public templateProvider: TemplateProvider,
    public permissionService: UserPermissionService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public popover: PopoverController,
    public toast: ToastController,
    public modal: ModalService,
    public userSettings:SettingsService) {
    super()
  }

  public showDateOptions(action: UIAction, currentValue: DateFunction): void {
    this.showActions({
      event: action.event,
      params: {
        options: DateUtil.convertToOptions(DateUtil.DATE_FUNCTIONS),
        selectedValue: DateUtil.convertToOption(currentValue)
      },
      selectHandler: (response: Option<any>) => {
        if (response.label == DateUtil.CUSTOM.label) {
          this.showDateSelectionModal(action, currentValue)
        } else {
          this.executeHandler(response, action)
        }
      }
    })
  }

  private showDateSelectionModal(action: UIAction, currentValue: DateFunction): void {
    this.modal.showModal({
      component: DateRangeComponent,
      params: {
        currentValue: currentValue
      },
      selectHandler: (response: any) => {
        this.executeHandler(response, action)
      }
    })
  }

  public showActions(action: UIAction): any {
    action.component = isNull(action.component) ? OptionsComponent : action.component;
    const backup = this.buildAction(action, this.popover);
    const popover = this.getPopoverComponent(action);
    this.buildResponseHandler(popover, backup, action);
  }

  public async showToast(message: string, duration: number = 1500, classes?: string[]) {
    const toast = await this.toast.create(
      {
        message: message,
        duration: duration,
        cssClass: classes,
        animated: true
      })
    toast.present()
  }

  private getPopoverComponent(uiAction: UIAction): Promise<HTMLIonPopoverElement> {
    return this.popover.create({
      component: uiAction.component,
      event: uiAction.event,
      componentProps: uiAction.params
    });
  }


  public showStatusOptions($event: Event, current: Status, handler: (status: Status) => void, options?: Array<Option<any>>): void {
    if (isEmpty(options)) {
      options = [
        { label: 'All', value: null, icon: "list-circle-outline" },
        { label: 'Active', value: true, icon: "checkmark-circle-outline" },
        { label: 'Inactive', value: false, icon: 'close-outline' },
      ]
    }
    this.showActions({
      event: $event,
      params: {
        options: options,
        selectedValue: current
      },
      selectHandler: (option: Option<boolean>) => {
        const status = { value: option.value, label: option.label, name: 'status' };
        if (handler) {
          handler(status);
        }
      }
    });
  }
}
