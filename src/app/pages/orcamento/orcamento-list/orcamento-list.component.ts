import { Component, OnInit } from '@angular/core';
import { OrcamentoListService } from './orcamento-list.service';
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
                this.orcamentoList = orcamentos;
                this.orcamentoList.map(order => order.updating = false);
                this.render = true;
            }, (err) => {
                this.render = err === null;
            })
    }

    aprovarOrcamento(i: number, status: number, aprovar: boolean) {
        this.changeStatus(i);
        const ref = this.orcamentoList[i].referencia;
        this.submitting = true;
        this.orcamentoService.aprovarOrcamento(ref, status, aprovar)
            .subscribe((updated) => {
                if (updated) {
                    this.orcamentoList[i].aprovacao = updated.aprovado;
                    this.orcamentoList[i].status = updated.status;
                    this.changeStatus(i);
                    this.submitting = false;
                }
            })
    }

    changeStatus(i: number) {
        this.orcamentoList[i].updating = !this.orcamentoList[i].updating;
    }

    totalValue(os: IOrcamentoList): number {
        let total = 0;
        total = os.servicos.reduce((a, b) => a + b.valorServico, 0);
        return total;
    }

    status(id: number) {
        return this.orcamentoService.statusOs(id);
    }

    changeClass(i: number, st: number) {
        this.orcamentoList[i].status = st;
    }

}
