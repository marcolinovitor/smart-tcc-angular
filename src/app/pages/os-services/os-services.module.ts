import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsServicesRoutingModule } from './os-services-routing.module';
import { OsServicesComponent } from './os-services-list/os-services.component';
import { OsServicesNewComponent } from './os-services-form/os-services-new.component';
import { OsServicesNewService } from './os-services-form/os-services-new.service';



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
    CommonModule,
    OsServicesRoutingModule,
  ],
  providers: [
    OsServicesNewService,
  ]
})
export class OsServicesModule { }
