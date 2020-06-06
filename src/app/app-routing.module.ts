import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuardService } from './shared/guards/profile-guard.service';
import { AdminModule } from './pages/admin/admin.module';
import { LoginModule } from './pages/login/login.module';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
