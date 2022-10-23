import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchandiserPageRoutingModule } from './merchandiser-routing.module';

import { MerchandiserPage } from './merchandiser.page';
import { AppCommonModule } from '../commons/commons.module';
import { MerchandiserListComponent } from './merchandiser-list/merchandiser-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchandiserPageRoutingModule,
    AppCommonModule
  ],
  declarations: [MerchandiserPage, MerchandiserListComponent]
})
export class MerchandiserPageModule {}
