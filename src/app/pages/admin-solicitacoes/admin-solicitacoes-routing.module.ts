import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSolicitacoesComponent } from './admin-solicitacoes.component';


const routes: Routes = [
    {
        path: '',
        component: AdminSolicitacoesComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSolicitacoesRoutingModule { }
