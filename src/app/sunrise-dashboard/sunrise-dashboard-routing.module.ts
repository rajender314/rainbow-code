import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunriseDashboardPage } from './sunrise-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: SunriseDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SunriseDashboardPageRoutingModule { }
