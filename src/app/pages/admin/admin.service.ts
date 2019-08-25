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
            profile: ['admin'],
            href: 'osSubMenu',
            subMenu: [
                { desc: 'Consultar', path: 'os-services' },
                { desc: 'Nova Ordem de Serviço', path: 'os-services/new' },
            ],
        },
        {
            desc: 'Clientes',
            href: 'clientSubMenu',
            profile: ['admin', 'compras'],
            subMenu: [
                { desc: 'Consultar', path: 'clientes' },
                { desc: 'Cadastrar Cliente', path: 'clientes/new' },
            ],
        },
        {
            desc: 'Orçamentos',
            href: 'orcamentosSubMenu',
            profile: ['admin', 'compras'],
            subMenu: [
                { desc: 'Consultar', path: '/orcamentos' },
                { desc: 'Novo Orçamento', path: '/orcamentos/new' },
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

profileDescription(): string {
    return [
        { prof: 'admin', desc: 'Administração' },
        { prof: 'compras', desc: 'Orçamentos' },
    ].find((f) => f.prof === this.getUserProfile().profile).desc;
}
}
