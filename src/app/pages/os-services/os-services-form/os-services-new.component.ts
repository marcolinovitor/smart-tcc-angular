import { Component, OnInit } from '@angular/core';
import { OsServicesNewService, Services } from './os-services-new.service';
import { IVehicles } from './model/vehicles.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrcamentoForm } from './model/orcamento-form.model';
import { utils } from 'src/app/shared/utils/utils';
import { IOrcamentoForm } from './model/orcamento-form.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-os-services-new',
	templateUrl: './os-services-new.component.html',
	styleUrls: ['./os-services-new.component.scss']
})

export class OsServicesNewComponent implements OnInit {

	tipos: IVehicles[] = [
		{ nome: 'Carro', codigo: 'carros' },
		{ nome: 'Moto', codigo: 'motos' },
		{ nome: 'Caminhão', codigo: 'caminhoes' },
	];

	services: Services[] = [];
	// services: Services[] = [{
	// 	id: 99,
	// 	nome: 'Outros',
	// 	valor: 0,
	// }];
	regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	regexPlaca = new RegExp('^[a-zA-Z]{3}[0-9]{4}$');

	vehiclesBrands: IVehicles[] = [];
	vehiclesName: IVehicles[] = [];

	servicesAdded = [];

	optCurrency = {
		align: "right",
		allowNegative: true,
		allowZero: true,
		decimal: ",",
		precision: 2,
		prefix: "R$ ",
		suffix: "",
		thousands: ".",
		nullable: true
	};

	orcamentoForm: FormGroup;
	submitting: boolean;
	newService: boolean;
	readonly: boolean;

	constructor(
		private osServicesNew: OsServicesNewService,
		private fb: FormBuilder,
		private toastr: ToastrService,
	) {
		this.listServices();
	}

	ngOnInit() {
		this.createForm();
	}

	listServices() {
		this.osServicesNew.getServices()
			.subscribe(res => {
				this.services = this.services.concat(res);
			});
	}

	createForm() {
		this.orcamentoForm = this.fb.group({
			marca: [{ value: '', disabled: true }, [Validators.required]],
			modelo: [{ value: '', disabled: true }, [Validators.required]],
			placa: ['', [Validators.required, Validators.pattern(this.regexPlaca), Validators.minLength(7), Validators.maxLength(7)]],
			cpfcnpj: ['', [Validators.required, this.documentDomainValidator]],
			nome: ['', [Validators.required]],
			fone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
			email: ['', [Validators.required, Validators.pattern(this.regexMail)]],
			relatado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
			diagnosticado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
			servico: ['', [Validators.required]],
			pecas: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
			valor: ['', [Validators.required, Validators.min(1)]],
			outros: [''],
		});
	}

	getVehicles(tipo: string) {
		this.vehiclesBrands = [];
		this.vehiclesName = [];
		this.osServicesNew.getVehicles(tipo)
			.subscribe((result) => {
				this.vehiclesBrands = result;
			}, (err) => {
				console.log(err);
			}, () => {
				this.orcamentoForm.controls['marca'].enable();
			})
	}

	getVehiclesByBrand(marca: number) {
		this.osServicesNew.getVehiclesName(marca)
			.subscribe((result) => {
				this.vehiclesName = result;
			}, (err) => {
				console.log(err);
			}, () => {
				this.orcamentoForm.controls['modelo'].enable();
			})
	}

	addService(form: IOrcamentoForm) {
		// if (form.outros) {
		// 	const servico = {
		// 		nome: form.outros,
		// 		valor: form.valor,
		// 	};
		// 	this.osServicesNew.saveService(servico)
		// 		.subscribe((res) => {
		// 			console.log(res);
		// 		})
		// } else {
			const s = {
				ServicoId: form.servico,
				DescricaoServico: form.pecas,
				ValorServico: form.valor,
			};
			this.servicesAdded.push(s);
		// }
	}

	hasServices(form: IOrcamentoForm): boolean {
		return !!(form.servico && form.valor && form.pecas);
	}

	serviceName(id): string {
		return this.services.find(f => f.id == id).nome;
	}

	removeItem(index: number) {
		this.servicesAdded.splice(index, 1);
	}

	setValue(id: string) {
		this.newService = id === '99';

		const valor = this.services.find(f => f.id == parseInt(id)).valor;
		this.orcamentoForm.controls['valor'].patchValue(valor);
	}

	// saveService(ctrl: string) {
	// 	console.log(this.orcamentoForm.controls[ctrl].value);
	// }

	getCliente(cpfcnpj: string) {
		this.readonly = false;
		const document: string = this.orcamentoForm.controls[cpfcnpj].value;
		this.osServicesNew.getCliente(document)
			.subscribe(cliente => {
				if (cliente) {
					this.setClient(cliente);
					this.readonly = true;
				}
			}, (err) => {
				this.setClient(err);
				this.readonly = false;
			})
	}

	saveOS(form: IOrcamentoForm) {
		this.submitting = true;
		const carro = {
			marca: this.vehiclesBrands.find(f => f.codigo == form.marca).nome,
			modelo: this.vehiclesName.find(f => f.codigo == form.modelo).nome,
		};
		const order = new OrcamentoForm(form, this.servicesAdded, carro);
		this.osServicesNew.saveOsService(order)
			.subscribe((res) => {
				if (res.referencia) {
					this.toastr.success(`Número da OS: ${res.referencia}`, 'Sucesso');
					this.submitting = false;
				}
				this.createForm();
				this.readonly = false;
				this.servicesAdded = [];
			}, (err) => {
				this.toastr.error(`Parece que houve um erro ... `, 'Ops');
			});
	}


	isValid(input: string): boolean {
		const field = this.orcamentoForm.controls[input];
		return field.valid && (field.touched || field.dirty);
	}

	isInvalid(input: string): boolean {
		const field = this.orcamentoForm.controls[input];
		return field.invalid && (field.touched || field.dirty);
	}

	fieldLen(f: string): number {
		return this.orcamentoForm.controls[f].value.length;
	}


	documentDomainValidator(control: FormControl) {
		return utils.validateDocument(control.value) ?
			{ docInvalid: true } : null;
	}

	private setClient(cliente: ClienteResponse) {
		if (cliente) {
			this.orcamentoForm.controls['nome'].patchValue(cliente.nome);
			this.orcamentoForm.controls['email'].patchValue(cliente.email);
			this.orcamentoForm.controls['fone'].patchValue(cliente.telefone);
		} else {
			this.orcamentoForm.controls['nome'].patchValue('');
			this.orcamentoForm.controls['email'].patchValue('');
			this.orcamentoForm.controls['fone'].patchValue('');
		}
	}

}
