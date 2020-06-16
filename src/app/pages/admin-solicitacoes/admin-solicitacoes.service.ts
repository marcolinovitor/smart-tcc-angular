import { Injectable } from '@angular/core';
import { urls } from '../../../environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreOrdemResponse } from './models/pre-ordem.response';
import { PreOrdemModel } from './models/pre-ordem.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminSolicitacoesService {

    private url = urls.smart.api;

    constructor(
        private readonly http: HttpClient,
    ) { }

    getAllSolicitacoes(): Observable<PreOrdemModel[]> {
        return this.http.get<PreOrdemResponse[]>(`${this.url}/PreOrdemServico`)
            .pipe(
                map(listPreOrdem => listPreOrdem.map(pre => new PreOrdemModel(pre)))
            );
    }
}
