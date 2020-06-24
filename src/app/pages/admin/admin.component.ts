import { Component, OnInit } from '@angular/core';
import { ListMenu, AdminService } from './admin.service';
import { SignalRService } from 'src/app/shared/signalr/signal-r.service';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [
        trigger('news', [
            state('ready', style({ opacity: 1 })),
            transition('void => ready', animate('300ms 0s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
                style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
                style({ opacity: 1, transform: 'translateX(0px)', offset: 1 })
            ]))),
            transition('ready => void', animate('300ms 0s ease-out', keyframes([
                style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
                style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
                style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
            ]))),
        ])
    ]
})
export class AdminComponent implements OnInit {

    state = 'ready'
    menuList: ListMenu[];
    userDescription: string;
    novasSolicitacoes = 0;

    constructor(
        private adminService: AdminService,
        private signalRService: SignalRService,
    ) {
        if (this.isAdmin()) {
            this.signalRService.startHub();
            this.signalRService.startConn();

            this.signalRService.novasOrdens.subscribe((nova) => {
                this.novasSolicitacoes += nova;
            })
        }
        this.userDescription = this.adminService.profileDescription();
    }


    ngOnInit() {
        this.menuList = this.adminService.menuList();
        this.userProfile();
    }

    resetCount() {
        this.novasSolicitacoes = 0;
    }

    getDate(): string {
        return this.adminService.geDate();
    }

    permission(profile: string[]): boolean {
        return profile.includes(this.userProfile());
    }

    logout() {
        this.adminService.logout();
    }

    userInformations() {
        return this.adminService.welcomeUser();
    }

    userProfile(): string {
        return this.adminService.getUserProfile().authenticatedRole;
    }

    isAdmin(): boolean {
        return this.adminService.isAdmin();
    }

}
