import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusCarrosRoutingModule } from './meus-carros-routing.module';
import { MeusCarrosComponent } from './meus-carros.component';
import { CoreModule } from 'src/app/core/core.module';
import { MeuCarroFormComponent } from './meu-carro-form/meu-carro-form.component';
import { MeusCarrosService } from './meus-carros.service';
import { OsServicesNewService } from '../os-services/os-services-form/os-services-new.service';
import { ModalModule } from 'src/app/shared/modal/modal.module';


@NgModule({
    declarations: [MeusCarrosComponent, MeuCarroFormComponent],
    imports: [
        ModalModule,
        CoreModule,
        MeusCarrosRoutingModule
    ],
    providers: [
        OsServicesNewService,
        MeusCarrosService,
    ]
})
export class MeusCarrosModule { }
