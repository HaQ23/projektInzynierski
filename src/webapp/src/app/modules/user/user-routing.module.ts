import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserVisitsComponent } from './components/user-visits/user-visits.component';

import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { roleGuard } from './guards/role.guard';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['USER'] },
    children: [
      { path: '', redirectTo: 'visits', pathMatch: 'full' },
      { path: 'visits', component: UserVisitsComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      { path: 'settings', component: UserSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
