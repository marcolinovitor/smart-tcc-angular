import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.clienteForm = this.fb.group({
      cpfcnpj: ['', [Validators.required, this.documentDomainValidator]],
      nome: ['', [Validators.required]],
      fone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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

}
