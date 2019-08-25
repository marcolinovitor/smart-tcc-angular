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
    const hasPermission = this.sessionService.getFromSession().profile === 'admin';
    if (!hasPermission) {
      this.route.navigate(['/login'])
      return false;
    } else {
      return true;
    }
  }
}
