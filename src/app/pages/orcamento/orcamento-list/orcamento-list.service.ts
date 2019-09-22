import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from 'src/environments/urls';
import { Observable, of, throwError } from 'rxjs';
import { IOrcamentoList } from './contract/orcamento-list.interface';
import { Request } from '../../os-services/os-services-form/model/request.interface';
import { SessionService } from 'src/app/shared/session/session.service';
import { map, catchError } from 'rxjs/operators';

export interface IStatus {
	status: string;
	classBadge: string;
	classBorder: string;
}

@Injectable()
export class OrcamentoListService {

	constructor(
		private http: HttpClient,
		private sessionService: SessionService
	) { }

	getOrcamentos(): Observable<IOrcamentoList[]> {
		return this.http.get<IOrcamentoList[]>(`${urls.smart.api}/ordemservico`);
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
		switch (id) {
			case 1: return {
				status: 'Pendente',
				classBadge: 'badge-warning',
				classBorder: 'border-warning',
			}
			case 2: return {
				status: 'Aprovado',
				classBadge: 'badge-success',
				classBorder: 'border-success',
			}
			case 3: return {
				status: 'Reprovado',
				classBadge: 'badge-danger',
				classBorder: 'border-danger',
			}
			case 4: return {
				status: 'Em andamento',
				classBadge: 'badge-info',
				classBorder: 'border-info',
			}
			default: return {
				status: 'Indisponível',
				classBadge: 'badge-secondary',
				classBorder: 'border-light',
			}
		}
	}
}
