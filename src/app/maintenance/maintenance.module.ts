import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenancePageRoutingModule } from './maintenance-routing.module';

import { MaintenancePage } from './maintenance.page';
import { AppCommonModule } from '../commons/commons.module';
import { DataViewComponent } from './data-view/data-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenancePageRoutingModule,
    AppCommonModule
  ],
  declarations: [MaintenancePage, DataViewComponent]
})
export class MaintenancePageModule {}
