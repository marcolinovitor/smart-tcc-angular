import { Injectable } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsServicesService {

  private url = urls.smart.api;

  constructor(private readonly http: HttpClient) { }

  getAllOrders(): Observable<OsListResponse[]> {
    return this.http.get<OsListResponse[]>(`${this.url}/ordemservico`);
  }
}
