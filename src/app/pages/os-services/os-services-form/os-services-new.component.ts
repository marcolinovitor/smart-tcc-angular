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

  private tipos: IVehicles[] = [
    { name: 'Carro', value: 'carros' },
    { name: 'Moto', value: 'motos' },
    { name: 'Caminhão', value: 'caminhoes' },
  ];

  private services: Services[] = [{
    id: 99,
    nome: 'Outros',
    valor: 0,
  }];
  private regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  private regexPlaca = new RegExp('^[a-zA-Z]{3}[0-9]{4}$');

  private vehiclesBrands: IVehicles[] = [];
  private vehiclesName: IVehicles[] = [];

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

  private orcamentoForm: FormGroup;
  submitting: boolean;
  newService: boolean;

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
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      placa: ['', [Validators.required, Validators.pattern(this.regexPlaca), Validators.minLength(7), Validators.maxLength(7)]],
      cpfcnpj: ['', [Validators.required, this.documentDomainValidator]],
      nome: ['', [Validators.required]],
      fone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.pattern(this.regexMail)]],
      relatado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      diagnosticado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      servico: ['', [Validators.required]],
      pecas: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      valor: ['', [Validators.required]]
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

  addService(form) {
    const s = {
      ServicoId: form.servico,
      DescricaoServico: form.pecas,
      ValorServico: form.valor,
    };
    this.servicesAdded.push(s);
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

  saveOS(form: IOrcamentoForm) {
    this.submitting = true;
    const order = new OrcamentoForm(form, this.servicesAdded);
    this.osServicesNew.saveOsService(order)
      .subscribe((res) => {
        if (res.referencia) {
          this.toastr.success(`Número da OS: ${res.referencia}`, 'Sucesso');
        }
      }, (err) => {
        this.toastr.error(`Parece que houve um erro ... `, 'Ops');
      }, () => {
        this.orcamentoForm.reset('');
        this.submitting = false;
      });
  }


  private isValid(input: string): boolean {
    const field = this.orcamentoForm.controls[input];
    return field.valid && (field.touched || field.dirty);
  }

  private isInvalid(input: string): boolean {
    const field = this.orcamentoForm.controls[input];
    return field.invalid && (field.touched || field.dirty);
  }

  private fieldLen(f: string): number {
    return this.orcamentoForm.controls[f].value.length;
  }


  private documentDomainValidator(control: FormControl) {
    return utils.validateDocument(control.value) ?
      { docInvalid: true } : null;
  }

}
