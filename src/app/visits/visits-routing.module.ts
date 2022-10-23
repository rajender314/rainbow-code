import { VisitDetailsPageComponent } from './visit-details-page/visit-details-page.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
  {
    path: '',
    component: VisitsPage
  },
  {
    path: ':id',
    component: VisitDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitsPageRoutingModule {}
