import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuardService } from './shared/guards/profile-guard.service';


const routes: Routes = [
  {
    path: 'os-services',
    canActivate: [ProfileGuardService],
    loadChildren: './pages/os-services/os-services.module#OsServicesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
