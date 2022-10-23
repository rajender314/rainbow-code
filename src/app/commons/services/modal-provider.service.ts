import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { UIAction } from '../models/common.models';
import { BaseUIProvider } from './base-ui-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends BaseUIProvider {

  constructor(private modal: ModalController) {
    super();
  }

  public showModal(action: UIAction): void {
    const backup = this.buildAction(action, this.modal)
    const modal = this.modal.create({ component: action.component, cssClass: action.cssClasses, mode: 'md' });
    this.buildResponseHandler(modal, backup, action);
  }

  public showComponentAsModal(action: UIAction): void {
    const backup = this.buildAction(action, this.modal)
    const modal = this.modal.create({
      component: ModalComponent,
      cssClass: action.cssClasses,
      mode: 'md',
      componentProps: {
        componentClass: action.component,
        data: action.params
      }
    });
    this.buildResponseHandler(modal, backup, action);
  }
}
