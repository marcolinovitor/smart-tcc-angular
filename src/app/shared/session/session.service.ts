import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  saveOnSession(user) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession() {
    const u = sessionStorage.getItem('user');
   
    return u ? this.decrypt(u) : '';
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
