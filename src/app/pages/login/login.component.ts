import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/shared/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private sessionService: SessionService,
    private route: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    })
  }

  login() {
    const item = {
      name: this.formLogin.value.login,
      profile: this.formLogin.value.senha,
    }
    this.sessionService.saveOnSession(item);
    this.route.navigate(['admin']);
  }

}
