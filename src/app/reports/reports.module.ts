import { ReportsHealthScoreComponent } from './reports-health-score/reports-health-score.component';
import { ReportsCoverageDataComponent } from './reports-coverage-data/reports-coverage-data.component';
import { ReportsOutletDataComponent } from './reports-outlet-data/reports-outlet-data.component';
import { ReportsDataComponent } from './reports-data/reports-data.component';
import { AppCommonModule } from './../commons/commons.module';
import { PageComponent } from './../commons/page/page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
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
    AppCommonModule,
    ReportsPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule
   
  ],
  declarations: [ReportsPage, ReportsDataComponent, ReportsOutletDataComponent, ReportsCoverageDataComponent, ReportsHealthScoreComponent]
})
export class ReportsPageModule {}
