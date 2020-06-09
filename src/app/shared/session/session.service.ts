import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/pages/login/model/login-user.interface';
import { ClienteResponse } from 'src/app/pages/clientes/clientes-list/model/cliente-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private route: Router) { }

  saveClientOnSession(cliente: ClienteResponse) {
      const cli = this.encrypt(cliente);
      sessionStorage.setItem('cliente', cli);
  }

  getClienteFromSession(): ClienteResponse {
      const cliente = sessionStorage.getItem('cliente');
      return cliente ? this.decrypt(cliente) : undefined;
  }

  saveOnSession(user: LoginUser) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession(): LoginUser {
    const u = sessionStorage.getItem('user');
   
    return u ? this.decrypt(u) : undefined;
  }

  logout(route?: string) {
    if (route) this.route.navigate([route])
      .then(() => {
        sessionStorage.clear();
      })
  }

  decrypt(obj) {
    const decrypted = atob(obj);
    return JSON.parse(decrypted);
  }

  encrypt(obj) {
    const json = JSON.stringify(obj);    
    return btoa(json);
  }

}
