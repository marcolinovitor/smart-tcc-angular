import { Component, OnInit } from '@angular/core';
import { OsServicesNewService } from './os-services-new.service';
import { IVehicles } from './model/vehicles.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrcamentoForm } from './model/orcamento-form.model';

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

  private services = [];

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

  constructor(
    private osServicesNew: OsServicesNewService,
    private fb: FormBuilder,
  ) {
    this.listServices();
  }

  ngOnInit() {
    this.createForm();
  }

  listServices() {
    this.osServicesNew.getServices()
      .subscribe(res => this.services = res);
  }

  createForm() {
    this.orcamentoForm = this.fb.group({
      marca: [{ value: 'Selecione', disabled: true }, [Validators.required]],
      modelo: [{ value: 'Selecione', disabled: true }, [Validators.required]],
      placa: ['', [Validators.required, Validators.maxLength(7)]],
      cpfcnpj: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      fone: [''],
      email: [''],
      relatado: ['', [Validators.required]],
      diagnosticado: ['', [Validators.required]],
      servico: ['Selecione', [Validators.required]],
      pecas: [''],
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
      servicoId: form.servico,
      descricaoServico: form.pecas,
      valorServico: form.valor,
    };
    this.servicesAdded.push(s);
    console.log(this.services);
    
    console.log(this.servicesAdded);
    
  }

  serviceName(id): string {
    return this.services.find(f => f.id == id).nome;
  }

  removeItem(index: number) {
    this.servicesAdded.splice(index, 1);
  }

  setValue(id: string) {   
    const valor = this.services.find(f => f.id == id).valor;
    this.orcamentoForm.controls['valor'].patchValue(valor);
  }

  saveOS(form) {
    console.log(form);
    const os = new OrcamentoForm();
    os.diagnosticado = form.diagnosticado;
    os.relatado = form.relatado;
    os.carro.cliente.nome = form.nome;
    os.carro.cliente.cpfCnpj = form.cpfCnpj;
    os.carro.cliente.email = form.email;
    os.carro.cliente.telefone = form.fone;
    os.carro.marca = this.vehiclesBrands.find(f => f.id == form.marca).name;
    os.carro.modelo = this.vehiclesName.find(f => f.id == form.modelo).name;
    os.carro.placa = form.placa;
    os.servico = this.servicesAdded;

    this.osServicesNew.saveOsService(os)
      .subscribe((res) => {
        console.log(res);
      })
  }

}
