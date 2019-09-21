import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes-form/clientes.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesListService } from './clientes-list/clientes-list.service';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';


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
    FormsModule,
    CoreModule,
    ModalModule,
    ClientesRoutingModule
  ],
  providers: [
    ClientesListService,
  ]
})
export class ClientesModule { }
