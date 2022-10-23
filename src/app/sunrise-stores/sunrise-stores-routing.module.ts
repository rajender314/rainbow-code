import { SunriseStoreDetailsComponent } from './sunrise-store-details/sunrise-store-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunriseStoresPage } from './sunrise-stores.page';

const routes: Routes = [
  {
    path: '',
    component: SunriseStoresPage
  },
  {
    path: ':id',
    component: SunriseStoreDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SunriseStoresPageRoutingModule {}
