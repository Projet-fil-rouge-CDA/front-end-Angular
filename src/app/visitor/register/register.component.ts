import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../shared/services/auth.service';
import { ValidationService } from '../../shared/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: any;

  constructor(
    private logsService: AuthService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private router : Router
  ) {
    this.registerForm = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, ValidationService.phoneValidator]],
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
    if (this.registerForm.dirty && this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.logsService.users$
      .next({
      prenom: this.registerForm.value.firstname,
      nom: this.registerForm.value.lastname,
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      motDePasse: this.registerForm.value.password,
      isActif: true,
      address: {rue: '', codePostal: 0, ville: ''},
      })
      this.router.navigate(['/add-address'])
    }
  }
}
