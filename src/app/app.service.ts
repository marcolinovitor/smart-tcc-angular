import { Injectable } from '@angular/core';
import { SessionService } from './shared/session/session.service';
import { Router } from '@angular/router';

export interface ListMenu {
    desc: string;
    profile: string[];
    href?: string;
    subMenu?: SubLitMenu[];
}

export interface SubLitMenu {
    desc: string;
    path: string;
}

@Injectable()
export class AppService {

    constructor(
        private sessionService: SessionService,
        private route: Router
    ) { }

    isLoggedIn() {
        const isLogged = !!this.sessionService.getFromSession();       
        isLogged ? this.route.navigate(['admin']) : this.route.navigate(['login']);
    }

}