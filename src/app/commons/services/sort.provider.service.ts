import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BaseUIProvider } from './base-ui-provider.service';
import { SortComponent } from '../sort/sort.component';
import { UIAction } from '../models/common.models';

@Injectable({
  providedIn: 'root'
})
export class SortProviderService extends BaseUIProvider {

  constructor(private popover: PopoverController) {
    super();
  }

  public open(uiAction: UIAction) {
    uiAction.component = SortComponent;
    const backup = this.buildAction(uiAction, this.popover);
    const popover = this.popover.create({ component: SortComponent, event: event, componentProps: uiAction.params })
    this.buildResponseHandler(popover, backup, uiAction);
  }
}
