import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session/session.service';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/urls';
import { ClienteResponse } from '../clientes/clientes-list/model/cliente-response.interface';
import { MeuVeiculo } from './model/meu-veiculo';

@Injectable()
export class MeusCarrosService {

    private urlApi = urls.smart.api;

    constructor(
        private readonly http: HttpClient,
        private readonly sessionService: SessionService,
    ) { }

    getClienteVeiculos(): Observable<MeuVeiculo[]> {
        const email = this.cliente.email;
        return this.http.get<MeuVeiculo[]>(`${this.urlApi}/Carro/BuscarCarrosPorEmail/${email}`);
    }

    cadastrarVeiculo(veiculo): Observable<MeuVeiculo> {
        const body = {
            placa: veiculo.placa.toUpperCase(),
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            clienteId: this.cliente.id,
        };
        return this.http.post<MeuVeiculo>(`${this.urlApi}/Carro`, body);
    }

    removeVeiculo(id: number): Observable<any> {
        return this.http.delete(`${this.urlApi}/Carro/${id}`);
    }

    get cliente(): ClienteResponse {
        return this.sessionService.getClienteFromSession();
    }
}
