import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Register } from 'src/app/shared/models/register';
import { RegisterService } from './register.service';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  registerForm: any;
  users$: BehaviorSubject<Register[]> = this.registerService.users$

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      terms: ['', [Validators.required]]
    })
  }

  saveUser() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.registerService.register(this.registerForm.value)
    }
  }
}
