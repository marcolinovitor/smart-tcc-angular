import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusCarrosRoutingModule } from './meus-carros-routing.module';
import { MeusCarrosComponent } from './meus-carros.component';
import { CoreModule } from 'src/app/core/core.module';
import { MeuCarroFormComponent } from './meu-carro-form/meu-carro-form.component';


@NgModule({
  declarations: [MeusCarrosComponent, MeuCarroFormComponent],
  imports: [
    CoreModule,
    MeusCarrosRoutingModule
  ]
})
export class MeusCarrosModule { }
