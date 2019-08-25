import { Component, OnInit } from '@angular/core';
import { AppService, ListMenu } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smart-mechanical';

  menuList: ListMenu[];
  userDescription: string;

  constructor(private appService: AppService) {
    this.appService.saveUserProfile();
    this.userDescription = this.appService.profileDescription();
  }

  ngOnInit() {
    this.menuList = this.appService.menuList();
    this.userProfile();  
  }

  getDate(): string {   
    return this.appService.geDate();
  }
  
  permission(profile: string[]): boolean {
    return profile.includes(this.userProfile());
  }

  private userProfile(): string {
    return this.appService.getUserProfile();
  }


}
