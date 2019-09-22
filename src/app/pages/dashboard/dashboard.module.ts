import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { DashboardService } from './dashboard/dashboard.service';



@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    FormsModule,
    CoreModule,
    ModalModule,
    DashboardRoutingModule,
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
