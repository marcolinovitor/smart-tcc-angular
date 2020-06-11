import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerguntasResponse, Alternativa } from './models/perguntas.interface';
import { urls } from 'src/environments/urls';
import { PreAberturaResponse } from './models/abertura-os.interface';
import { MeuVeiculo } from '../meus-carros/model/meu-veiculo';
import { tap } from 'rxjs/operators';
import { SessionService } from '../../shared/session/session.service';

@Injectable()
export class SolicitacaoService {

    private _url = urls.smart.api;
    private nomeCliente = '';

    constructor(
        private readonly http: HttpClient,
        private readonly sessionService: SessionService
    ) {
        this.nomeCliente = this.sessionService.getClienteFromSession().nome;
    }

    inicializarPerguntas(hasVeiculo: boolean): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/IniciarQuestionario`)
            .pipe(
                tap(result => {
                    if (hasVeiculo) {
                        result.pergunta = result.pergunta.replace('Olá', `Hmmm, certo`);
                    }
                })
            );
    }

    proximaPergunta(id): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/CarregarPergunta/${id}`);
    }

    abrirPreOrdem(preId, idCarro): Observable<PreAberturaResponse> {
        return this.http.get<PreAberturaResponse>(`${this._url}/Perguntas/CarregarPreAbertura/${preId}/${idCarro}`);
    }

    montarVeiculosChat(veiculos: MeuVeiculo[]) {
        return new PerguntasResponse().setVeiculos(veiculos, this.nomeCliente);
    }

    sugerirCadastro() {
        return new PerguntasResponse().setSegurirCadastro();
    }

    
}
