import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerguntasResponse } from './models/perguntas.interface';
import { urls } from 'src/environments/urls';
import { PreAberturaResponse } from './models/abertura-os.interface';

@Injectable()
export class SolicitacaoService {

    private _url = urls.smart.api;

    constructor(
        private readonly http: HttpClient,
    ) { }

    public inicializarPerguntas(): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/IniciarQuestionario`);
    }

    public proximaPergunta(id): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${this._url}/Perguntas/CarregarPergunta/${id}`);
    }

    public abrirPreOrdem(tipo): Observable<PreAberturaResponse> {
        return this.http.get<PreAberturaResponse>(`${this._url}/Perguntas/CarregarPreAbertura/${tipo}`);
    }
}
