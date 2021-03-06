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
    hasVeiculos = false;
    showMsg = false;
    idCarro: number;

    constructor(
        private readonly solicitacaoService: SolicitacaoService,
        private readonly route: Router,
        private readonly meusCarrosService: MeusCarrosService,
    ) {
        this.perguntas = [];
    }

    ngOnInit(): void {
        this.getVeiculos();
    }

    getVeiculos(): void {
        this.perguntas = [];
        this.meusCarrosService.getClienteVeiculos()
            .subscribe((veiculos) => {
                this.hasVeiculos = true;
                this.perguntas.push(this.solicitacaoService.montarVeiculosChat(veiculos));
            }, () => {
                this.hasVeiculos = false;
                this.cadastrarVeiculo();
                // this.getPerguntas();
            });
    }

    cadastrarVeiculo() {
        this.perguntas.push(this.solicitacaoService.sugerirCadastro());
    }

    getPerguntas(): void {
        this.solicitacaoService.inicializarPerguntas(this.hasVeiculos)
            .subscribe(result => {
                this.perguntas.push(result);
                this.showMsg = false;
            })
    }

    getEscolha(alter: Alternativa) {
        this.showMsg = true;
        const model = new PerguntasResponse();
        if (alter.perguntaOSId === 0) {
            this.inicioChat(alter, model);
        } else {
            this.chatFlow(alter, model);
        }
    }

    inicioChat(alter: Alternativa, model: PerguntasResponse) {
        this.idCarro = alter.idCarro;
        this.perguntas.push(model.setClienteEscolha(alter));
        this.getPerguntas();
    }

    chatFlow(alter: Alternativa, model: PerguntasResponse) {
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
                this.showMsg = false;
            }, (err) => {
                // console.log('err', err);
            }, () => {
                this.scrollCol();
            });
    }

    getPreOrdem(preAberturaOSId): void {
        this.solicitacaoService.abrirPreOrdem(preAberturaOSId, this.idCarro)
            .subscribe((result) => {
                const model = new PerguntasResponse();
                this.perguntas.push(model.setEncerramento(result));
            }, (err) => {
                console.log(err);
            }, () => {
                this.showMsg = false;
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

    goToVeiculos() {
        this.route.navigate(['admin/meus-carros']);
    }

    private scrollCol(): void {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);
    }

}
