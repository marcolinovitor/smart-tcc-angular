import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OsServicesComponent } from './os-services-list/os-services.component';
import { OsServicesNewComponent } from './os-services-form/os-services-new.component';


const routes: Routes = [
  { path: '', component: OsServicesComponent },
  { path: 'new', component: OsServicesNewComponent },
  { path: ':id/edit', component: OsServicesNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OsServicesRoutingModule { }
