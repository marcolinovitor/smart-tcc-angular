import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes-form/clientes.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';


const routes: Routes = [
  { path: '', component: ClientesListComponent },
  { path: 'new', component: ClientesComponent },
  { path: ':id/edit', component: ClientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
