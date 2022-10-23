import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SunriseDashboardPageRoutingModule } from './sunrise-dashboard-routing.module';
import { SunriseDashboardPage } from './sunrise-dashboard.page';
import { AppCommonModule } from 'src/app/commons/commons.module';
import { SunriseDashboardSummaryComponent } from './sunrise-dashboard-summary/sunrise-dashboard-summary.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SunriseDashboardPageRoutingModule,
    AppCommonModule,
  ],
  declarations: [
    SunriseDashboardPage,
    SunriseDashboardSummaryComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class SunriseDashboardModule { }
