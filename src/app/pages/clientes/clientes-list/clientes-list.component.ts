import { Component, OnInit } from '@angular/core';
import { ClientesListService } from './clientes-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {

  private clientes: ClienteResponse[] = [];
  edit = false;
  error: boolean;

  constructor(
    private clienteListService: ClientesListService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteListService.getClientes()
      .subscribe((res) => {
        this.clientes = res;
        this.clientes.map((c) => c.editable = false); 
        this.error = false;
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.message, 'Ops!');
        this.error = true;
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
