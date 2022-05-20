import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { ValidationService } from '../../shared/services/validation.service';
import { LogsService } from '../../shared/services/logs.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  users$: BehaviorSubject<Users[]> = this.logsService.users$

  constructor(
    private logsService: LogsService,
    private formBuilder: FormBuilder,
    private router : Router,
    private titleService : Title
  ) {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, ValidationService.emailOrPhoneValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
    })
  }
  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Se connecter');
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.logsService.login(this.loginForm.value)
      this.router.navigate(['/add-address'])
    }
  }
}
