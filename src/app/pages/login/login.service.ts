import { Injectable } from '@angular/core';
import { urls } from 'src/environments/urls';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session/session.service';
import { map, catchError } from 'rxjs/operators';

export interface Usuario {
    email: string;
    senha: string;
}

@Injectable()
export class LoginService {
    private url = urls.smart.api;

    constructor(
        private http: HttpClient,
        private route: Router,
        private session: SessionService,
    ) { }

    login(user: Usuario): Observable<boolean> {
        return this.http.post<LoginUser>(`${this.url}/autenticar`, user)
            .pipe(
                map((usuario: LoginUser) => {
                    if (usuario) {
                        const role = usuario.authenticatedRole === 'Mecanico';
                        this.session.saveOnSession(usuario);
                        this.route.navigate([`admin${role ? '/dashboard': '/orcamentos'}`]);
                        return true;
                    }
                })
            );
    }
}