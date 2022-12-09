import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './admin/Components/contas/contas.component';
import { DefaultComponent } from './admin/default/default.component';
import { LoginComponent } from './public/login/login.component';
import { ProfileComponent } from './public/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DefaultComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'contas', component: ContasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
