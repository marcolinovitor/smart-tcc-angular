import { Injectable } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClientesListService {

  private url = urls.smart.api;

  constructor(private readonly http: HttpClient) { }

  getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.url}/cliente`);
  }
}
