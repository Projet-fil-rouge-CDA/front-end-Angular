import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlMessagesComponentVisitor } from '../shared/components/control-messages-visitor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisitorRoutingModule } from './visitor-routing.module';
import {UserModule} from "../user/user.module";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ControlMessagesComponentVisitor,
    AddAddressComponent
  ],
    imports: [
        VisitorRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UserModule
    ]
})
export class VisitorModule { }
