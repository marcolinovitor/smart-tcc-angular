import { Component, OnInit } from '@angular/core';
import { AdminSolicitacoesService } from './admin-solicitacoes.service';
import { PreOrdemModel } from './models/pre-ordem.model';
import { OsServicesNewService } from '../os-services/os-services-form/os-services-new.service';

@Component({
    selector: 'app-admin-solicitacoes',
    templateUrl: './admin-solicitacoes.component.html',
    styleUrls: ['./admin-solicitacoes.component.scss']
})
export class AdminSolicitacoesComponent implements OnInit {

    listaPreOrdens: PreOrdemModel[] = [];
    error = false;

    constructor(
        private readonly adminSolicitacoesService: AdminSolicitacoesService,
        private readonly osService: OsServicesNewService,
    ) { }

    ngOnInit(): void {
        this.listarTodasSolicitacoes();
    }

    listarTodasSolicitacoes(): void {
        this.adminSolicitacoesService.getAllSolicitacoes()
            .subscribe((solicitacoes) => {
                this.listaPreOrdens = solicitacoes;
            }, (err) => {
                this.listaPreOrdens = [];
            })
    }

    setPreOrdem(preOrdem: PreOrdemModel) {
        this.osService.setPreOrdemAndGo(preOrdem);
    }

}
