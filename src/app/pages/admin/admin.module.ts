import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoreModule } from 'src/app/core/core.module';
import { OsServicesModule } from '../os-services/os-services.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CoreModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
