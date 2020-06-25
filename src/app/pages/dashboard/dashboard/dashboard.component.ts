import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { IOrcamentoList, Servico } from '../../orcamento/orcamento-list/contract/orcamento-list.interface';
import { DashboardService } from './dashboard.service';
import { utils } from '../../../shared/utils/utils';
import { SignalRService } from 'src/app/shared/signalr/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/urls';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	animations: [
		trigger('card', [
			state('ready', style({ opacity: 1 })),
			transition('void => ready', animate('300ms 0s ease-in', keyframes([
				style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
				style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
				style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
			]))),
			transition('ready => void', animate('300ms 0s ease-out', keyframes([
				style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
				style({ opacity: 0.8, transform: 'translateY(-10px)', offset: 0.2 }),
				style({ opacity: 0, transform: 'translateY(30px)', offset: 1 })
			]))),
		])
	]
})
export class DashboardComponent implements OnInit {

	render = false;
	state = 'ready';

	orders: IOrcamentoList[] = [];
	submitting: boolean;

	constructor(
        private dashboardService: DashboardService,
        private signalRService: SignalRService,
	) {
        this.notificacao();
    }

	ngOnInit() {
		this.getAllOrders();
    }


	getAllOrders() {
		this.dashboardService.getOrcamentos()
			.subscribe(orders => {
				this.orders = orders;
				this.orders.map(order => order.updating = false);
				this.render = true;
			})
	}
	
	// verServicos(servicos: Servico[]) {
		
	// 	console.log(servicos);
	// }

	atualizarStatus(i: number, status: number) {
		this.change(i);
		this.submitting = true;
		const ref = this.orders[i].referencia;
		this.dashboardService.alterarStatus(ref, status)
			.subscribe((updated) => {
				if (updated) {
					this.orders[i].status = updated.status;
					this.submitting = false;
					this.change(i);
					if (updated.status === 5) {
						setTimeout(() => {
							this.orders.splice(i, 1);
						}, 1500)
					}
				}
			})
	}

	change(i: number) {
		this.orders[i].updating = !this.orders[i].updating;
	}

	totalValue(os: IOrcamentoList): number {
		let total = 0;
		total = os.servicos.reduce((a, b) => a + b.valorServico, 0);
		return total;
	}

	status(id: number) {
		return utils.statusOs(id);
    }
    
    private notificacao() {
        this.signalRService.novaAprovacao.subscribe(aprovado => {
            this.getAllOrders();
        });
    }

}
