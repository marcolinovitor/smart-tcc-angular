import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from './solicitacao.service';
import { PerguntasResponse, Alternativa } from './models/perguntas.interface';
import { Router } from '@angular/router';
import { MeusCarrosService } from '../meus-carros/meus-carros.service';

@Component({
    selector: 'app-solicitacao',
    templateUrl: './solicitacao.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {

    perguntas: PerguntasResponse[];

    constructor(
        private readonly solicitacaoService: SolicitacaoService,
        private readonly route: Router,
        private readonly meusCarrosService: MeusCarrosService,
    ) {
        this.perguntas = [];
    }

    ngOnInit(): void {
        // this.getVeiculos();
        this.getPerguntas();
    }

    getVeiculos(): void {
        this.meusCarrosService.getClienteVeiculos()
            .subscribe((veiculos) => {
                this.perguntas.push(this.solicitacaoService.montarVeiculosChat(veiculos));
            });
    }

    getPerguntas(): void {
        this.perguntas = [];
        this.solicitacaoService.inicializarPerguntas()
            .subscribe(result => {
                this.perguntas.push(result);
            })
    }

    getEscolha(alter: Alternativa) {
        const model = new PerguntasResponse();
        const idProximaPergunta = alter.proximaPerguntaOSId;
        this.perguntas.push(model.setClienteEscolha(alter));
        this.scrollCol();
        if (alter.alternativaFinal) {
            const tipoPre = alter.preAberturaOSId;
            this.getPreOrdem(tipoPre);
        } else {
            this.getNovaPergunta(idProximaPergunta);
        }
    }

    getNovaPergunta(id): void {
        this.solicitacaoService.proximaPergunta(id)
            .subscribe((result) => {
                this.perguntas.push(result);
            }, (err) => {
                // console.log('err', err);
            }, () => {
                this.scrollCol();
            });
    }

    getPreOrdem(tipo): void {
        this.solicitacaoService.abrirPreOrdem(tipo)
            .subscribe((result) => {
                const model = new PerguntasResponse();
                this.perguntas.push(model.setEncerramento(result));
            }, (err) => {
                console.log(err);
            }, () => {
                this.scrollCol();
            });
    }

    novoAtendimento(novo: boolean) {
        if (novo) {
            this.getPerguntas();
        } else {
            this.route.navigate(['admin/orcamentos']);
        }
    }

    private scrollCol(): void {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);
    }

}
