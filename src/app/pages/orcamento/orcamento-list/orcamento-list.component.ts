import { Component, OnInit } from '@angular/core';
import { OrcamentoListService, IStatus } from './orcamento-list.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { IOrcamentoList } from './contract/orcamento-list.interface';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss'],
  animations: [
	trigger('card', [
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
export class OrcamentoListComponent implements OnInit {

  state = 'ready';
  render = false;

  orcamentoList: IOrcamentoList[] = [];
  userEmail: string;
	submitting: boolean;

  constructor(private orcamentoService: OrcamentoListService) {
	  this.userEmail = this.orcamentoService.getUserEmail();
  }

  ngOnInit() {
	this.getAllOrders();
  }

  getAllOrders() {
	this.orcamentoService.getOrcamentos()
	  .subscribe((orcamentos) => {
		this.orcamentoList = orcamentos.filter(orcamento => orcamento.carro.cliente.email === this.userEmail);
		this.render = true;
	  })
  }

  aprovarOrcamento(i: number, status: number, aprovar: boolean) {
	  this.submitting = true;
	  const ref = this.orcamentoList[i].referencia;
	  this.orcamentoService.aprovarOrcamento(ref, status, aprovar)
	  	.subscribe((updated) => {
			  if (updated) {
				  this.orcamentoList[i].aprovacao = updated.aprovado;
				  this.orcamentoList[i].status = updated.status;
				  this.submitting = false;
			  }
		  })
  }

  totalValue(os: IOrcamentoList): number {
	let total = 0;
	total = os.servicos.reduce((a, b) => a + b.valorServico, 0);
	return total;
  }

  status(id: number): IStatus {
	return this.orcamentoService.statusOs(id);
  }

  changeClass(i: number, st: number) {
	this.orcamentoList[i].status = st;
  }

}
