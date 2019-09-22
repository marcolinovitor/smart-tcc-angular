import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoListService } from './orcamento-list/orcamento-list.service';



@NgModule({
  declarations: [
    OrcamentoListComponent
  ],
  exports: [
    OrcamentoListComponent
  ],
  imports: [
    FormsModule,
    CoreModule,
    ModalModule,
    OrcamentoRoutingModule
  ],
  providers: [OrcamentoListService]
})
export class OrcamentoModule { }
