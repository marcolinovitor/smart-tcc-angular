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
        if (isLogged) {
            this.route.navigate(['/admin']);
        } else {
            this.route.navigate(['/login']);
        }
    }

}