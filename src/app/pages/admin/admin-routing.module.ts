import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileGuardService } from 'src/app/shared/guards/profile-guard.service';
import { ClienteGuardService } from 'src/app/shared/guards/cliente-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'os-services',
        canActivate: [ProfileGuardService],
        loadChildren: () => import('../os-services/os-services.module').then(m => m.OsServicesModule)
      },
      {
        path: 'dashboard',
        canActivate: [ProfileGuardService],
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'orcamentos',
        canActivate: [ClienteGuardService],
        canLoad: [ClienteGuardService],
        loadChildren: () => import('../orcamento/orcamento.module').then(m => m.OrcamentoModule)
      },
      {
        path: 'solicitacoes',
        canActivate: [ClienteGuardService],
        canLoad: [ClienteGuardService],
        loadChildren: () => import('../solicitacao/solicitacao.module').then(m => m.SolicitacaoModule)
      },
      {
        path: 'meus-carros',
        canActivate: [ClienteGuardService],
        canLoad: [ClienteGuardService],
        loadChildren: () => import('../meus-carros/meus-carros.module').then(m => m.MeusCarrosModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
