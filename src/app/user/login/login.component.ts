import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Register } from 'src/app/shared/models/register';
import { ValidationService } from '../register/validation.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any;
  users$: BehaviorSubject<Register[]> = this.registerService.users$

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, ValidationService.emailOrPhoneValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
    })
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.registerService.login(this.loginForm.value)
    }
  }
}
