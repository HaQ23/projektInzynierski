import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { adminRoleGuard } from './guards/admin-role.guard';
import { OfferManagementComponent } from './components/offer-management/offer-management.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeeOfferManagementComponent } from './components/employee-offer-management/employee-offer-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [adminRoleGuard],
    children: [
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
      { path: 'user-management', component: UserManagementComponent },
      {
        path: 'reservation-management',
        component: ReservationManagementComponent,
      },
      {
        path: 'offer-management',
        component: OfferManagementComponent,
      },
      {
        path: 'employee-management',
        component: EmployeeManagementComponent,
      },
      {
        path: 'employee-offer-management',
        component: EmployeeOfferManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
