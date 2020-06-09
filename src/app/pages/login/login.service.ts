import { Injectable } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session/session.service';
import { map, tap } from 'rxjs/operators';
import { LoginUser } from './model/login-user.interface';
import { ClientesListService } from '../clientes/clientes-list/clientes-list.service';

export interface Usuario {
    email: string;
    senha: string;
}

@Injectable()
export class LoginService {
    private url = urls.smart.api;

    constructor(
        private readonly http: HttpClient,
        private readonly route: Router,
        private readonly session: SessionService,
        private readonly clienteService: ClientesListService,
    ) { }

    login(user: Usuario): Observable<boolean> {
        let isMecanico = false;
        return this.http.post<LoginUser>(`${this.url}/autenticar`, user)
            .pipe(
                map((usuario: LoginUser) => {
                    if (usuario) {
                        isMecanico = usuario.authenticatedRole === 'Mecanico';
                        this.session.saveOnSession(usuario);
                        return true;
                    }
                }),
                tap(() => this.getClienteAndSave(user.email, isMecanico)),
            );
    }

    private getClienteAndSave(email: string, isMecanico: boolean): void {
        this.clienteService.getClienteByEmail(email)
            .subscribe(result => {
                this.session.saveClientOnSession(result);
            }, () => {
                //
            }, () => {
                this.route.navigate([`admin${isMecanico ? '/dashboard': '/orcamentos'}`]);
            });
    }
}