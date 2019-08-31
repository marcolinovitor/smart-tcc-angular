import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { NgxCurrencyModule } from "ngx-currency";
import { InputContainerComponent } from '../shared/input-container/input-container.component';


@NgModule({
  imports: [
    ButtonModule,
    CommonModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  exports: [
    NgxCurrencyModule,
    ButtonModule,
    CommonModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputContainerComponent,
  ],
  declarations: [
    InputContainerComponent,
  ],
})
export class CoreModule { }
