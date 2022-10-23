import { VisitDetailsPageComponent } from './visits/visit-details-page/visit-details-page.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/authentication-guard/authentication.guard';
import { UnauthenticationGuard } from './services/unauthentication-guard/unauthentication.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [UnauthenticationGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: 'rainbow/dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: "always"
  },
  {
    path: 'rainbow/maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenancePageModule)
  },
  {
    path: 'rainbow/visits',
    loadChildren: () => import('./visits/visits.module').then(m => m.VisitsPageModule)
  },
  {
    path: 'rainbow/stores',
    loadChildren: () => import('./stores/stores.module').then(m => m.StoresPageModule)
  },
  {
    path: 'rainbow/merchandiser',
    loadChildren: () => import('./merchandiser/merchandiser.module').then(m => m.MerchandiserPageModule)
  },
  {
    path: 'rainbow/reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule)
  },
  {
    path: 'rainbow/beats',
    loadChildren: () => import('./beats/beats.module').then(m => m.BeatsPageModule)
  },
  {
    path: 'rainbow/user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementPageModule)
  },
  // {
  //   path: 'sundashboard',
  //   loadChildren: () => import('./sundashboard/sundashboard.module').then(m => m.SundashboardModule),
  //   canActivate: [AuthenticationGuard],
  //   runGuardsAndResolvers: "always"
  // },
  {
    path: 'sunrise/dashboard',
    loadChildren: () => import('./sunrise-dashboard/sunrise-dashboard.module').then(m => m.SunriseDashboardModule),
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: "always"
  },
  {
    path: 'sunrise/stores',
    loadChildren: () => import('./sunrise-stores/sunrise-stores.module').then(m => m.SunriseStoresPageModule)
  },
  // {
  //   path: 'visits',
  //   component: VisitDetailsPageComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
