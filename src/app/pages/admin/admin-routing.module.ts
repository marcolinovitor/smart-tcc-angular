import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileGuardService } from 'src/app/shared/guards/profile-guard.service';
import { OsServicesModule } from '../os-services/os-services.module';
import { ClientesModule } from '../clientes/clientes.module';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'os-services',
        canActivate: [ProfileGuardService],
        loadChildren: '../os-services/os-services.module#OsServicesModule'
      },
      {
        path: 'clientes',
        loadChildren: '../clientes/clientes.module#ClientesModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
