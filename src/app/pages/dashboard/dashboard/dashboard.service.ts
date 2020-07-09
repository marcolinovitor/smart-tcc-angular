import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/urls';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IOrcamentoList } from '../../orcamento/orcamento-list/contract/orcamento-list.interface';

@Injectable()
export class DashboardService {

	constructor(private http: HttpClient) { }

	getOrcamentos(): Observable<IOrcamentoList[]> {
        return this.http.get<IOrcamentoList[]>(`${urls.smart.api}/ordemservico/buscarporstatus/2,4`)
            .pipe(
                map(orders => orders.sort((a, b) => {
                     return a.status - b.status;
                })),
                catchError(err => throwError(undefined))
            );
	}

	alterarStatus(ref: string, st: number): Observable<{ status: number }> {
		const update = { aprovacao: true, status: st };
		return this.http.patch<IOrcamentoList>(`${urls.smart.api}/ordemservico/atualizarstatus/${ref}`, update)
			.pipe(
				map(os => {
					return { status: os.status }
				}),
				catchError(err => throwError(undefined))
			);
	}
}
