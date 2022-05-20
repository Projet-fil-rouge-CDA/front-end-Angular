import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlMessagesComponent } from './register/control-messages-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisitorRoutingModule } from './visitor-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ControlMessagesComponent,
    AddAddressComponent
  ],
    imports: [
      VisitorRoutingModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class VisitorModule { }
