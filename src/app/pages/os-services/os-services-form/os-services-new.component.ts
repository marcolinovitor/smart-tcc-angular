import { Component, OnInit } from '@angular/core';
import { OsServicesNewService } from './os-services-new.service';
import { IVehicles } from './model/vehicles.model';

interface Vehicles {
  key: string;
  value: string;
}

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

  private vehiclesBrands: IVehicles[] = [];
  private vehiclesName: IVehicles[] = [];

  constructor(private osServicesNew: OsServicesNewService) { }

  ngOnInit() {
  }

  getVehicles(tipo: string) {
    this.osServicesNew.getVehicles(tipo)
      .subscribe((result) => {
          this.vehiclesBrands = result;
      })
  }

  getVehiclesByBrand(marca: number) {
    this.osServicesNew.getVehiclesName(marca)
      .subscribe((result) => {
        this.vehiclesName = result;
      })
  }

}
