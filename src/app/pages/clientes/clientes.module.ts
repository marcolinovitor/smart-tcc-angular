import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes-form/clientes.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesListService } from './clientes-list/clientes-list.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientesComponent,
    ClientesListComponent,
  ],
  exports: [
    ClientesComponent,
    ClientesListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientesRoutingModule
  ],
  providers: [
    ClientesListService
  ]
})
export class ClientesModule { }
