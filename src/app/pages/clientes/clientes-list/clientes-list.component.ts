import { Component, OnInit } from '@angular/core';
import { ClientesListService } from './clientes-list.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {

  private clientes: ClienteResponse[] = [];
  edit = false;

  constructor(
    private clienteListService: ClientesListService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteListService.getClientes()
      .subscribe((res) => {
        this.clientes = res;
        this.clientes.map((c) => c.editable = false); 
      });
  }

  editMode(cliente: ClienteResponse, index: number) {
    this.edit = !this.edit;
    this.clientes[index].editable = !this.clientes[index].editable;
  }

  removeItem(index: number) {
    this.clientes.splice(index, 1);
  }

}
