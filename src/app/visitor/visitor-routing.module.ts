import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddAddressComponent } from './add-address/add-address.component';
import {HomeComponent} from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { VisitorGuard } from './visitor.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [VisitorGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [VisitorGuard] },
  { path: 'login', component: LoginComponent, canActivate: [VisitorGuard]},
  { path: 'add-address', component: AddAddressComponent, canActivate: [VisitorGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorRoutingModule { }
