import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeatsPageRoutingModule } from './beats-routing.module';

import { BeatsPage } from './beats.page';
import { AppCommonModule } from '../commons/commons.module';
import { BeatListComponent } from './beat-list/beat-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeatsPageRoutingModule,
    AppCommonModule
  ],
  declarations: [BeatsPage, BeatListComponent]
})
export class BeatsPageModule {}
