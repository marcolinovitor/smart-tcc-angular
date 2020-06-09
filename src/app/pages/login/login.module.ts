import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/core/core.module';
import { LoginService } from './login.service';
import { ClientesListService } from '../clientes/clientes-list/clientes-list.service';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CoreModule,
        LoginRoutingModule
    ],
    providers: [
        ClientesListService,
        LoginService,
    ]
})
export class LoginModule { }
