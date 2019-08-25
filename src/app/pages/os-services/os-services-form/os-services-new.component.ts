import { Component, OnInit } from '@angular/core';
import { OsServicesNewService } from './os-services-new.service';
import { IVehicles } from './model/vehicles.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

  private services = [
    { name: 'Martelinho de Ouro', value: 'mt-ouro' }
  ];

  private vehiclesBrands: IVehicles[] = [];
  private vehiclesName: IVehicles[] = [];

  private orcamentoForm: FormGroup;

  constructor(
    private osServicesNew: OsServicesNewService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.orcamentoForm = this.fb.group({
      veiculo: [{ value: 'Selecione', disabled: true }, [Validators.required]],
      cpf: ['', [Validators.required]],
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
      })
  }

  getVehiclesByBrand(marca: number) {
    this.osServicesNew.getVehiclesName(marca)
      .subscribe((result) => {
        this.vehiclesName = result;
      }, (err) => {
        console.log(err);
      }, () => {
        this.orcamentoForm.controls['veiculo'].enable();
      })
  }

}
