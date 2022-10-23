import { MatTooltipModule } from '@angular/material/tooltip';
import { VisitImagesComponent } from './visit-images/visit-images.component';
import { VisitDeatilGridComponent } from './visit-deatil-grid/visit-deatil-grid.component';
import { VisitFilterComponent } from './visit-filter/visit-filter.component';
import { StoreFilterComponent } from './../stores/store-filter/store-filter.component';
import { VisitDetailsPageComponent } from './visit-details-page/visit-details-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitsPageRoutingModule } from './visits-routing.module';

import { VisitsPage } from './visits.page';
import { AppCommonModule } from '../commons/commons.module';
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitsPageRoutingModule,
    AppCommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  declarations: [VisitsPage, VisitListComponent, VisitDetailsComponent, 
    VisitDetailsPageComponent, VisitFilterComponent, VisitDeatilGridComponent, VisitImagesComponent]
})
export class VisitsPageModule {}
