import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/shared/session/session.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  notAuthorized: boolean;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.loginService.login(this.formLogin.value)
      .subscribe((res) => {

      }, (err) => {      
        this.notAuthorized = err.status === 401;
      });
  }

}
