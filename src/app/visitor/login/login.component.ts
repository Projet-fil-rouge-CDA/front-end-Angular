import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  messageError: string;
  showPassword : boolean = false;

  constructor(
    private logsService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router,
    private titleService : Title
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      motDePasse: ['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Se connecter');
  }

    togglePassword(){
        this.showPassword = !this.showPassword
    }

  async login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
        try {
            await this.logsService.login(this.loginForm.value);
        } catch (error) {
            // @ts-ignore
            this.messageError = error.error.Message
        }
    }
  }
}
