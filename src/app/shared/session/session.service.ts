import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private route: Router) { }

  saveOnSession(user) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession() {
    const u = sessionStorage.getItem('user');
   
    return u ? this.decrypt(u) : '';
  }

  logout(route?: string) {
    sessionStorage.clear();
    if (route) this.route.navigate([route]);
  }

  private decrypt(obj) {
    const decrypted = atob(obj);
    return JSON.parse(decrypted);
  }

  private encrypt(obj) {
    const json = JSON.stringify(obj);    
    return btoa(json);
  }

}
