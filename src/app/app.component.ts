import { Component, OnInit } from '@angular/core';
import { AppService, ListMenu } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smart-mechanical';

  constructor(private appService: AppService) {
    this.appService.isLoggedIn();
  }

  ngOnInit() {
  }

}
