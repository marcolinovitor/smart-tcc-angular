import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from './solicitacao.service';
import { PerguntasResponse, Alternativa } from './models/perguntas.interface';

@Component({
    selector: 'app-solicitacao',
    templateUrl: './solicitacao.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {

    perguntas: PerguntasResponse[];

    constructor(
        private readonly solicitacaoService: SolicitacaoService
    ) {
        this.perguntas = [];
    }

    ngOnInit(): void {
        this.getPerguntas();
    }

    getPerguntas(): void {
        this.solicitacaoService.inicializarPerguntas()
            .subscribe(result => {
                this.perguntas.push(result);
            })
    }

    getEscolha(alter: Alternativa) {
        const model = new PerguntasResponse();
        this.perguntas.push(model.setClienteEscolha(alter));
    }

}
