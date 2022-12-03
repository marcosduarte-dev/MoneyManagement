import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from './admin/Components/contas/contas.component';
import { DefaultComponent } from './admin/default/default.component';

const routes: Routes = [
  {path: '', component: DefaultComponent},
  {path: 'Contas', component: ContasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
