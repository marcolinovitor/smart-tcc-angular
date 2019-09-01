import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuardService } from './shared/guards/profile-guard.service';
import { AdminModule } from './pages/admin/admin.module';
import { LoginModule } from './pages/login/login.module';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
