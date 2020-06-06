import { NgModule } from '@angular/core';

import { SolicitacaoRoutingModule } from './solicitacao-routing.module';
import { SolicitacaoComponent } from './solicitacao.component';
import { SolicitacaoService } from './solicitacao.service';
import { CoreModule } from 'src/app/core/core.module';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [SolicitacaoComponent, ChatComponent],
  imports: [
    CoreModule,
    SolicitacaoRoutingModule
  ],
  providers: [
      SolicitacaoService,
  ]
})
export class SolicitacaoModule { }
