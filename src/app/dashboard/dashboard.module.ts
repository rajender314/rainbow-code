import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { AppCommonModule } from 'src/app/commons/commons.module';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    AppCommonModule,
  ],
  declarations: [
    DashboardPage,
    DashboardSummaryComponent
  ],
  providers: [
  ],
  exports: [
  ]
})
export class DashboardPageModule { }
