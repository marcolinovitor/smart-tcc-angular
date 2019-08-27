import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/urls';
import { IVehicles } from './model/vehicles.model';
import { map } from 'rxjs/operators';
import { Request } from './model/request.interface';
import { OrcamentoForm, Servico } from './model/orcamento-form.model';

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
        const url = `${this.urlFipe}${this.tipo}/marcas.json`;
        return this.http.get<IVehicles[]>(url)
            .pipe(
                map((res) => {
                    const list = [];
                    res.forEach(item => list.push({ id: item.id, name: item.name }))
                    return list;
                })
            );
    }

    getVehiclesName(marca: number): Observable<IVehicles[]> {
        const url = `${this.urlFipe}${this.tipo}/veiculos/${marca}.json`;
        return this.http.get<IVehicles[]>(url)
            .pipe(
                map((cars) => {
                    const list = [];
                    cars.forEach(car => list.push({ id: car.id, name: car.name }));
                    return list;
                })
            );
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

    saveOsService<T>(form: OrcamentoForm): Observable<T> {
        const url = `${this.urlApi}/ordemServico`
        const request = this.createRequest(form);
        return this.http.post<T>(url, request);
    }

    private createRequest(form: OrcamentoForm): Request {
        return {
            Aprovacao: false,
            ProblemaRelatado: form.relatado,
            ProblemaDescrito: form.diagnosticado,
            Carro: {
                Placa: form.carro.placa,
                Modelo: form.carro.modelo,
                Marca: form.carro.marca,
                Cliente: {
                    Nome: form.carro.cliente.nome,
                    CpfCnpj: form.carro.cliente.cpfCnpj,
                    Telefone: form.carro.cliente.telefone,
                    Email: form.carro.cliente.email,
                    PerfilSistema: 'client',
                }
            },
            Servicos: form.servico,
        };
    }

}