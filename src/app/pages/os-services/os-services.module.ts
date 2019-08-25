import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsServicesRoutingModule } from './os-services-routing.module';
import { OsServicesComponent } from './os-services-list/os-services.component';
import { OsServicesNewComponent } from './os-services-form/os-services-new.component';
import { OsServicesNewService } from './os-services-form/os-services-new.service';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    OsServicesComponent,
    OsServicesNewComponent,
  ],
  exports: [
    OsServicesComponent,
    OsServicesNewComponent,
  ],
  imports: [
    CoreModule,
    OsServicesRoutingModule,
  ],
  providers: [
    OsServicesNewService,
  ]
})
export class OsServicesModule { }
