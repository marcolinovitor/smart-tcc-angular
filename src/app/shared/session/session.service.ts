import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  profile: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private route: Router) { }

  saveOnSession(user: User) {
    const u = this.encrypt(user);
    sessionStorage.setItem('user', u);
  }

  getFromSession(): User {
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
