import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerguntasResponse, Alternativa } from './models/perguntas.interface';
import { urls } from 'src/environments/urls';
import { PreAberturaResponse } from './models/abertura-os.interface';
import { MeuVeiculo } from '../meus-carros/model/meu-veiculo';

@Injectable()
export class SolicitacaoService {

    private _url = urls.smart.api;

    constructor(
        private readonly http: HttpClient,
    ) { }

    inicializarPerguntas(): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/IniciarQuestionario`);
    }

    proximaPergunta(id): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/CarregarPergunta/${id}`);
    }

    abrirPreOrdem(tipo): Observable<PreAberturaResponse> {
        return this.http.get<PreAberturaResponse>(`${this._url}/Perguntas/CarregarPreAbertura/${tipo}`);
    }

    montarVeiculosChat(veiculos: MeuVeiculo[]) {
        return new PerguntasResponse().setVeiculos(veiculos);
    }

    
}
