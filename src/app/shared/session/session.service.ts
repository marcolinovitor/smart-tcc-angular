import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private route: Router) { }

  saveOnSession(user: LoginUser) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession(): LoginUser {
    const u = sessionStorage.getItem('user');
   
    return u ? this.decrypt(u) : '';
  }

  logout(route?: string) {
    sessionStorage.clear();
    if (route) this.route.navigate([route]);
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
