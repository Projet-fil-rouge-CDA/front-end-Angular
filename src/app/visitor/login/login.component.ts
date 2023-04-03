import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(
    private logsService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router,
    private titleService : Title
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Se connecter');
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.logsService.login(this.loginForm.value);
    }
  }
}
