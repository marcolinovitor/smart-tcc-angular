import { Component, OnInit } from '@angular/core';
import { ListMenu, AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menuList: ListMenu[];
  userDescription: string;

  constructor(private adminService: AdminService) {
    this.userDescription = this.adminService.profileDescription();
  }

  ngOnInit() {
    this.menuList = this.adminService.menuList();
    this.userProfile();  
  }

  getDate(): string {   
    return this.adminService.geDate();
  }
  
  permission(profile: string[]): boolean {
    return profile.includes(this.userProfile());
  }

  logout() {
    this.adminService.logout();
  }

  userInformations() {
    return this.adminService.welcomeUser();
  }

  userProfile(): string {
    return this.adminService.getUserProfile().profile;
  }

}
