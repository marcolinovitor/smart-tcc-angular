import { Injectable } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/session/session.service';
import { map } from 'rxjs/operators';
import { utils } from 'src/app/shared/utils/utils';
import { OsListResponse } from './model/os-response.interface';

@Injectable()
export class OsServicesService {

  private url = urls.smart.api;

  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService,
  ) { }

  getAllOrders(): Observable<OsListResponse[]> {
    return this.http.get<OsListResponse[]>(`${this.url}/ordemservico`)
      .pipe(
        map((oslist) => {
          if (this.isAdmin()) return oslist;
          else {
            const list = [];
            oslist.forEach((item) => {
              if (item.carro.cliente.email === this.userEmail()) {
                list.push(item);
              }
            })
            return list;
          }
        })
      );
  }

  setStatus(id: number) {
    return utils.statusOs(id);
  }

  isAdmin(): boolean {
    return this.sessionService.getFromSession().authenticatedRole === 'Mecanico';
  }

  userEmail(): string {
    return this.sessionService.getFromSession().authenticatedUser;
  }
}
