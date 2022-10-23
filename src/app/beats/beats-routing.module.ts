import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeatsPage } from './beats.page';

const routes: Routes = [
  {
    path: '',
    component: BeatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeatsPageRoutingModule {}
