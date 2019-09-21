import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { utils } from 'src/app/shared/utils/utils';
import { ICliente } from './contract/cliente.interface';
import { ClientesListService } from '../clientes-list/clientes-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-clientes',
	templateUrl: './clientes.component.html',
	styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

	clienteForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private clienteService: ClientesListService,
		private toastr: ToastrService
	) { }

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.clienteForm = this.fb.group({
			cpfcnpj: ['', [Validators.required, this.documentDomainValidator]],
			nome: ['', [Validators.required]],
			telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
			email: ['', [Validators.required, Validators.email]],
		});
	}

	isValid(input: string): boolean {
		const field = this.clienteForm.controls[input];
		return field.valid && (field.touched || field.dirty);
	}

	isInvalid(input: string): boolean {
		const field = this.clienteForm.controls[input];
		return field.invalid && (field.touched || field.dirty);
	}


	documentDomainValidator(control: FormControl) {
		return utils.validateDocument(control.value) ?
			{ docInvalid: true } : null;
	}

	saveClient(form: ICliente) {
		this.clienteService.saveCliente(form)
			.subscribe((res) => {
				this.toastr.success(`Cliente: ${res.nome}`, 'Cadastrado!');
				this.clienteService.newClient(res);
			})

	}

}
