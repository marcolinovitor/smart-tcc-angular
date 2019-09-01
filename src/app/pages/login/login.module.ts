import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CoreModule } from 'src/app/core/core.module';
import { LoginService } from './login.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CoreModule,
    LoginRoutingModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
