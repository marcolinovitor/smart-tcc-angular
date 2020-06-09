import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeusCarrosComponent } from './meus-carros.component';


const routes: Routes = [
    { path: '', component: MeusCarrosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeusCarrosRoutingModule { }
