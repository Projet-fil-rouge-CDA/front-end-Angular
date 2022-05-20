import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { LogsService } from '../../shared/services/logs.service';
import { ValidationService } from '../../shared/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: any;
  users$: BehaviorSubject<Users[]> = this.logsService.users$

  constructor(
    private logsService: LogsService,
    private formBuilder: FormBuilder,
    private titleService: Title
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
  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | S\'enregistrer');
  }

  saveUser() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.logsService.register(this.registerForm.value)
    }
  }
}
