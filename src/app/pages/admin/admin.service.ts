import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/shared/session/session.service';

export interface ListMenu {
  desc: string;
  profile: string[];
  href?: string;
  subMenu?: SubLitMenu[];
}

export interface SubLitMenu {
  desc: string;
  path: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private sessionService: SessionService
) { }

menuList(): ListMenu[] {
    return [
        {
            desc: 'Ordens de Serviço',
            profile: ['Mecanico'],
            href: 'osSubMenu',
            subMenu: [
                { desc: 'Consultar', path: 'os-services' },
                { desc: 'Nova Ordem de Serviço', path: 'os-services/new' },
            ],
        },
        {
            desc: 'Clientes',
            href: 'clientSubMenu',
            profile: ['Mecanico'],
            subMenu: [
                { desc: 'Consultar / Cadastrar', path: 'clientes' },
            ],
        },
        {
            desc: 'Orçamentos',
            href: 'orcamentosSubMenu',
            profile: ['Cliente'],
            subMenu: [
                { desc: 'Solicitações', path: 'solicitacoes' },
            ],
        }
    ];
}

geDate() {
    let date = new Date();
    let months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    let week = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    return `${week[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getUTCFullYear()}`
}


getUserProfile() {
    return this.sessionService.getFromSession();
}

isAdmin() {
    return this.sessionService.getFromSession().authenticatedRole === 'Mecanico';
}

logout() {
    this.sessionService.logout('login');
}

welcomeUser() {
  const hour = new Date().getHours();
  const good = (hour < 12) ? 'Bom dia' : (hour > 12 && hour < 18) ? 'Boa tarde' : 'Boa noite';
  
  return `${good}, ${this.getUserProfile().authenticatedUser}`;
}

profileDescription(): string {
    return [
        { prof: 'Mecanico', desc: 'Administração' },
        { prof: 'Cliente', desc: 'Cliente' },
    ].find((f) => f.prof === this.getUserProfile().authenticatedRole).desc;
}
}
