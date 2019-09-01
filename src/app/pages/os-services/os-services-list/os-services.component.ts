import { Component, OnInit } from '@angular/core';
import { OsServicesService } from './os-services.service';

@Component({
  selector: 'app-os-services',
  templateUrl: './os-services.component.html',
  styleUrls: ['./os-services.component.scss']
})
export class OsServicesComponent implements OnInit {

  constructor(
    private osServices: OsServicesService,
  ) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.osServices.getAllOrders()
      .subscribe((res) => {
        console.log(res);
      })
  }

}
