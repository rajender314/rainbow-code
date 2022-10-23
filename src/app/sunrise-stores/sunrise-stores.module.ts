import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SunriseStoresPageRoutingModule } from './sunrise-stores-routing.module';

import { SunriseStoresPage } from './sunrise-stores.page';
import { AppCommonModule } from '../commons/commons.module';
import { SunriseStoreListComponent } from './sunrise-store-list/sunrise-store-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SunriseStoreDetailsComponent } from './sunrise-store-details/sunrise-store-details.component';
import { SunriseStoreFilterComponent } from './sunrise-store-filter/sunrise-store-filter.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SunriseStoresPageRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  declarations: [SunriseStoresPage, SunriseStoreListComponent, SunriseStoreDetailsComponent, SunriseStoreFilterComponent]
})
export class SunriseStoresPageModule {}
