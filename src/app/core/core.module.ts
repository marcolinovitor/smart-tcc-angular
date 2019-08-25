import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [],
})
export class CoreModule { }
