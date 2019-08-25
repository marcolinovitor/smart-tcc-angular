import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/urls';
import { IVehicles } from './model/vehicles.model';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OsServicesNewService {

    private url = urls.fipe.api;
    private tipo: string;
    
    constructor(private http: HttpClient) {}

    getVehicles(tipo: string): Observable<IVehicles[]> {
        this.tipo = tipo;
        const url = `${this.url}${this.tipo}/marcas.json`;
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
        const url = `${this.url}${this.tipo}/veiculos/${marca}.json`;
        return this.http.get<IVehicles[]>(url)
            .pipe(
                map((cars) => {
                    const list = [];
                    cars.forEach(car => list.push({ id: car.id, name: car.name }));
                    return list;
                })
            );
    }

}