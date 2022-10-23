import { ReportsHealthScoreComponent } from './reports-health-score/reports-health-score.component';
import { ReportsCoverageDataComponent } from './reports-coverage-data/reports-coverage-data.component';
import { ReportsOutletDataComponent } from './reports-outlet-data/reports-outlet-data.component';
import { ReportsDataComponent } from './reports-data/reports-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsPage } from './reports.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  },
  {
    path: 'reports-data',
    component: ReportsDataComponent
  },
  {
    path: 'reports-outlet-data',
    component: ReportsOutletDataComponent
  },
  {
    path: 'reports-coverage-data',
    component: ReportsCoverageDataComponent
  },
  {
    path: 'reports-health-score',
    component: ReportsHealthScoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsPageRoutingModule {}
