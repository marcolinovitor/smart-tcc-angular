import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/pages/login/model/login-user.interface';
import { ClienteResponse } from 'src/app/pages/clientes/clientes-list/model/cliente-response.interface';
import { PreOrdemModel } from 'src/app/pages/admin-solicitacoes/models/pre-ordem.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private route: Router) { }

  savePreOrdem(preOrdem: PreOrdemModel) {
      const preOrdemCrypt = this.encrypt(preOrdem);
      sessionStorage.setItem('preOrdem', preOrdemCrypt);
  }

  saveClientOnSession(cliente: ClienteResponse) {
      const cli = this.encrypt(cliente);
      sessionStorage.setItem('cliente', cli);
  }

  getClienteFromSession(): ClienteResponse {
      const cliente = sessionStorage.getItem('cliente');
      return cliente ? this.decrypt(cliente) : undefined;
  }

  getPreOrdemFromSesseion(): PreOrdemModel {
      const preOrdem = sessionStorage.getItem('preOrdem');
      return preOrdem ? this.decrypt(preOrdem) : undefined;
  }

  saveOnSession(user: LoginUser) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession(): LoginUser {
    const u = sessionStorage.getItem('user');
   
    return u ? this.decrypt(u) : undefined;
  }

  clearPreOrdem(): void {
      sessionStorage.removeItem('preOrdem');
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
