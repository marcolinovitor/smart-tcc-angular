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
        const user = this.sessionService.getFromSession();
        if (user) {
            switch (user.authenticatedRole) {
                case 'Mecanico': {
                    this.route.navigate(['admin/dashboard']);
                    break;
                }
                case 'Cliente': {
                    this.route.navigate(['admin/orcamentos']);
                    break;
                }
                default: {
                    this.route.navigate(['login']);
                }
            }
        } else {
            this.route.navigate(['login']);
        }
    }

}