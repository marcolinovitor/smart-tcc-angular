import { Component, OnInit } from '@angular/core';
import { OsServicesService } from './os-services.service';
import { IStatus } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-os-services',
  templateUrl: './os-services.component.html',
  styleUrls: ['./os-services.component.scss']
})
export class OsServicesComponent implements OnInit {

  osList: OsListResponse[] = [];

  servicosContratados: OsListResponse;

  isAdmin: boolean;
  error = false;

  constructor(
    private osServices: OsServicesService,
  ) {
    this.isAdmin = this.osServices.isAdmin();
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.osServices.getAllOrders()
      .subscribe((res) => {        
        this.osList = res;
      }, (err) => {
        this.error = true;
      })
  }

  getServices(item: OsListResponse) {  
    this.servicosContratados = item;
  }

  totalValue(item: OsListResponse): number {
    let soma = 0;
    item.servicos.forEach((servico) => {
      soma += servico.valorServico;
    })
    return soma;
  }

  setStatus(status: number) {
    return this.osServices.setStatus(status);
  }

}
