import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuardService implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private route: Router
  ) { }

  canActivate(): boolean {
    const user = this.sessionService.getFromSession();    
    if (user && user.authenticatedRole === 'Mecanico') {
      return true;
    } else if (user) {
      this.route.navigate(['/admin'])
      return false;
    } else {
      this.route.navigate(['/login'])
      return false;
    }
  }
}
