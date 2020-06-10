import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MeusCarrosService } from './meus-carros.service';
import { MeuVeiculo } from './model/meu-veiculo';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-meus-carros',
    templateUrl: './meus-carros.component.html',
    styleUrls: ['./meus-carros.component.scss'],
    animations: [
        trigger('row', [
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
export class MeusCarrosComponent implements OnInit {

    spinner = true;
    error = false;
    veiculos: MeuVeiculo[] = [];
    veiculo: MeuVeiculo;
    state = 'ready';
    titleModal = '';

    constructor(
        private readonly meusCarrosService: MeusCarrosService,
        private readonly toastr: ToastrService,

    ) { }

    ngOnInit(): void {
        this.getMeusCarros();
    }

    getMeusCarros(): void {
        this.spinner = true;
        this.meusCarrosService.getClienteVeiculos()
            .subscribe(result => {
                this.veiculos = result;
            }, (err) => {
                console.log(err);
            }, () => {
                this.spinner = false;
            })
    }

    cadastrarVeiculo(veiculo): void {
        this.meusCarrosService.cadastrarVeiculo(veiculo)
            .subscribe(result => {
                this.veiculos.push(result);
            }, err => {
                //
            }, () => {
                this.toastr.success('Veículo cadastrado com sucesso');
            })
    }

    setVeiculo(veiculo: MeuVeiculo): void {
        this.titleModal = `Remover ${veiculo.marca}`;
        this.veiculo = veiculo;
    }

    removeVeiculo(): void {
        this.meusCarrosService.removeVeiculo(this.veiculo.id)
            .subscribe(result => {
                this.veiculos.splice(this.veiculos.indexOf(this.veiculo), 1);
            }, err => {
                //
            }, () => {
                this.toastr.success('Veículo removido com sucesso');
            })
    }

}
