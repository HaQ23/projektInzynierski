import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ActivationPendingGuard } from './guards/activation-pending.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'activation-account',
    component: ActivationAccountComponent,
    canActivate: [ActivationPendingGuard],
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
