import { Component, OnInit } from '@angular/core';
import { ClientesListService } from './clientes-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VeiculoCliente } from './model/veiculo-cliente.interface';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
  animations: [
    trigger('row', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
        style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
        style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
        style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
      ]))),
    ])
  ]
})
export class ClientesListComponent implements OnInit {

  state = 'ready';

  clientes: ClienteResponse[] = [];
  veiculosCliente: VeiculoCliente[] = [];
  edit = false;
  error: boolean;
  spinner: boolean;


  constructor(
    private clienteListService: ClientesListService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getClientes();
    this.novoCliente();
  }

  novoCliente() {
    this.clienteListService.novoCliente.subscribe((cliente) => {
      if (cliente) this.clientes.push(cliente);
    })
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

  getClienteByDoc(cliente: ClienteResponse) {
    this.spinner = true;
    this.clienteListService.getClienteByCPF(cliente.cpfCnpj)
      .subscribe((result) => {
        this.veiculosCliente = result.carros;
        this.spinner = false;
      })
  }

  removeItem(cliente: ClienteResponse) {  
    this.clienteListService.removeCliente(cliente.id)
      .subscribe((res) => {
        this.toastr.success(`Cliente: ${res.nome}`, 'Removido!')
          .onShown.subscribe((obs) => {
            this.clientes.splice(this.clientes.indexOf(cliente), 1);
          })
      }, (err) => {
        console.log(err);
      })
  }

}
