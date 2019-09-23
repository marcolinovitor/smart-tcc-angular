import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/urls';
import { Observable, throwError } from 'rxjs';
import { IOrcamentoList } from './contract/orcamento-list.interface';
import { SessionService } from 'src/app/shared/session/session.service';
import { map, catchError } from 'rxjs/operators';
import { utils, IStatus } from 'src/app/shared/utils/utils';

@Injectable()
export class OrcamentoListService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	getOrcamentos(): Observable<IOrcamentoList[]> {
		const doc = this.sessionService.getFromSession().clientDocument;
		return this.http.get<IOrcamentoList[]>(`${urls.smart.api}/ordemservico/buscarpordocumento/${doc}`)
			.pipe(
				catchError(err => throwError(null))
			);
	}

	getUserEmail(): string {
		return this.sessionService.getFromSession().authenticatedUser;
	}

	aprovarOrcamento(ref: string, st: number, aprovar: boolean): Observable<{ aprovado: boolean, status: number }> {
		const update = { aprovacao: aprovar, status: st };
		return this.http.patch<IOrcamentoList>(`${urls.smart.api}/ordemservico/atualizarstatus/${ref}`, update)
			.pipe(
				map(os => {
					return {
						aprovado: os.aprovacao,
						status: os.status
					}
				}),
				catchError(err => throwError(undefined))
			);
	}

	statusOs(id: number): IStatus {
		return utils.statusOs(id);
	}
}
