import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSolicitacoesRoutingModule } from './admin-solicitacoes-routing.module';
import { AdminSolicitacoesComponent } from './admin-solicitacoes.component';
import { AdminSolicitacoesService } from './admin-solicitacoes.service';
import { CoreModule } from 'src/app/core/core.module';
import { OsServicesNewService } from '../os-services/os-services-form/os-services-new.service';


@NgModule({
    declarations: [AdminSolicitacoesComponent],
    imports: [
        CoreModule,
        AdminSolicitacoesRoutingModule
    ],
    providers: [
        AdminSolicitacoesService,
        OsServicesNewService,
    ]
})
export class AdminSolicitacoesModule { }
