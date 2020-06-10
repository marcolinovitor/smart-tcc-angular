import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OsServicesNewService } from '../../os-services/os-services-form/os-services-new.service';
import { IVehicles } from '../../os-services/os-services-form/model/vehicles.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-meu-carro-form',
    templateUrl: './meu-carro-form.component.html',
    styleUrls: ['./meu-carro-form.component.scss']
})
export class MeuCarroFormComponent implements OnInit {

    tipos: IVehicles[] = [
		{ nome: 'Carro', codigo: 'carros' },
		{ nome: 'Moto', codigo: 'motos' },
		{ nome: 'Caminhão', codigo: 'caminhoes' },
	];
    marcasVeiculos: IVehicles[] = [];
    nomesVeiculos: IVehicles[] = [];
    veiculosForm: FormGroup;
    regexPlaca = new RegExp('^[a-zA-Z]{3}[0-9]{4}$');
    @Output() novoVeiculo = new EventEmitter<{}>();

    constructor(
        private readonly osService: OsServicesNewService,
        private readonly fb: FormBuilder,
    ) {
        this.createForm();
    }

    ngOnInit(): void {
    }

    createForm() {
		this.veiculosForm = this.fb.group({
			marca: [{ value: '', disabled: true }, [Validators.required]],
			modelo: [{ value: '', disabled: true }, [Validators.required]],
			placa: ['', [Validators.required, Validators.pattern(this.regexPlaca), Validators.minLength(7), Validators.maxLength(7)]],
		});
    }
    
    salvarVeiculo(form: FormGroup): void {
        const veiculo = {
            marca: this.marcasVeiculos.find(f => f.codigo == form.value.marca).nome,
            modelo: this.nomesVeiculos.find(f => f.codigo == form.value.modelo).nome,
            placa: form.value.placa,
            clienteId: '',
        };
        this.novoVeiculo.emit(veiculo);
        this.veiculosForm.reset();
    }

    getVeiculos(tipo: string): void {
        this.marcasVeiculos = [];
        this.nomesVeiculos = [];
        this.osService.getVehicles(tipo)
            .subscribe((result) => {
                this.marcasVeiculos = result;
            }, (err) => {
                console.log(err);
            }, () => {
                this.veiculosForm.controls['marca'].enable();
            })
    }

    getVeiculosPorMarca(marca: number) {
		this.osService.getVehiclesName(marca)
			.subscribe((result) => {
				this.nomesVeiculos = result;
			}, (err) => {
				console.log(err);
			}, () => {
				this.veiculosForm.controls['modelo'].enable();
			})
    }
    
    isValid(input: string): boolean {
		const field = this.veiculosForm.controls[input];
		return field.valid && (field.touched || field.dirty);
	}

	isInvalid(input: string): boolean {
		const field = this.veiculosForm.controls[input];
		return field.invalid && (field.touched || field.dirty);
	}

}
