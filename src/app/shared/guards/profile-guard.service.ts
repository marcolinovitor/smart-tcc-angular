import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuardService implements CanActivate {

  constructor(private sessionService: SessionService) { }
 
  canActivate(): boolean {
    return this.sessionService.getFromSession().profile === 'admin';
  }
}
