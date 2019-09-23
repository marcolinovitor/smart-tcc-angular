import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { urls } from 'src/environments/urls';
import { IVehicles } from './model/vehicles.model';
import { map, catchError } from 'rxjs/operators';
import { Request } from './model/request.interface';
import { OrcamentoForm, Servico } from './model/orcamento-form.model';
import { IOrcamentoForm } from './model/orcamento-form.interface';

export interface Services {
    id?: number;
    nome: string;
    valor: number;
}

@Injectable()
export class OsServicesNewService {
  
    private urlFipe = urls.fipe.api;
    private urlApi = urls.smart.api;
    private tipo: string;

    constructor(private http: HttpClient) { }

    getVehicles(tipo: string): Observable<IVehicles[]> {
        this.tipo = tipo;
        const url = `${this.urlFipe}${this.tipo}/marcas`;
        return this.http.get<IVehicles[]>(url)
            .pipe(
                map((res) => {
                    const list = [];
                    res.forEach(item => list.push({ codigo: item.codigo, nome: item.nome }))
                    return list;
                })
            );
    }

    getVehiclesName(marca: number): Observable<IVehicles[]> {
        const url = `${this.urlFipe}${this.tipo}/marcas/${marca}/modelos`;
        return this.http.get<FipeModelos>(url)
            .pipe(
                map((cars) => {
                    const list = [];
                    cars.modelos.forEach(car => list.push({ codigo: car.codigo, nome: car.nome }));
                    return list;
                })
            );
    }

    getCliente(document: string): Observable<ClienteResponse> {
        const url = `${this.urlApi}/cliente/buscarpordocumento/${document}`;
        return this.http.get<ClienteResponse>(url)
            .pipe(
                map(cliente => cliente),
                catchError(err => throwError(err))
            )
    }

    getServices(): Observable<Services[]> {
        const url = `${this.urlApi}/servico`;
        return this.http.get<Services[]>(url)
            .pipe(
                map((services) => {
                    const list = [];
                    services.forEach(s => list.push({ id: s.id, nome: s.nome, valor: s.valor }))
                    return list;
                })
            );
    }

    saveService<T>(servico: { nome: string; valor: number; }): Observable<T> {
        const url = `${this.urlApi}/servico`;
        return this.http.post<T>(url, servico);
    }

    saveOsService(form: OrcamentoForm): Observable<OsResponse> {       
        const url = `${this.urlApi}/ordemServico`
        const request = this.createRequest(form);
        return this.http.post<OsResponse>(url, request);
    }

    private createRequest(form: OrcamentoForm): Request {
        return {
            Aprovacao: false,
            ProblemaRelatado: form.relatado,
            ProblemaDescrito: form.diagnosticado,
            Carro: {
                Placa: form.carro.placa.toUpperCase(),
                Modelo: form.carro.modelo,
                Marca: form.carro.marca,
                Cliente: {
                    Nome: form.carro.cliente.nome,
                    CpfCnpj: form.carro.cliente.cpfCnpj,
                    Telefone: form.carro.cliente.telefone,
                    Email: form.carro.cliente.email,
                    PerfilSistema: 'Cliente',
                }
            },
            Servicos: form.servico,
        };
    }

}