import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchandiserPage } from './merchandiser.page';

const routes: Routes = [
  {
    path: '',
    component: MerchandiserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchandiserPageRoutingModule {}
