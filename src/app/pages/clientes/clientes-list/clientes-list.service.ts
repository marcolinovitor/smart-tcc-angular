import { Injectable, EventEmitter } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICliente } from '../clientes-form/contract/cliente.interface';
import { ClienteResponse } from './model/cliente-response.interface';

@Injectable()
export class ClientesListService {

    private url = urls.smart.api;
    novoCliente = new EventEmitter<ClienteResponse>();

    constructor(private readonly http: HttpClient) { }

    getClientes(): Observable<ClienteResponse[]> {
        return this.http.get<ClienteResponse[]>(`${this.url}/cliente`);
    }

    getClienteByCPF(cpf: string): Observable<ClienteResponse> {
        return this.http.get<ClienteResponse>(`${this.url}/cliente/${cpf}`);
    }

    getClienteByEmail(email: string): Observable<ClienteResponse> {
        return this.http.get<ClienteResponse>(`${this.url}/cliente/GetByEmail/${email}`);
    }

    saveCliente(cliente: ICliente): Observable<ClienteResponse> {
        const client = Object.assign({ oficinaId: 1, perfilSistema: 'customer' }, cliente) as ICliente;
        return this.http.post<ClienteResponse>(`${this.url}/cliente`, client);
    }

    removeCliente(id: number): Observable<{ status: string }> {
        return this.http.delete<{ status: string }>(`${this.url}/cliente/${id}`)
            .pipe(
                map((res) => {
                    if (res.status)
                        return res;
                }),
                catchError(err => throwError(undefined))
            );
    }

    newClient(cliente: ClienteResponse) {
        this.novoCliente.emit(cliente);
    }
}
