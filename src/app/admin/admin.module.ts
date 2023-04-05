import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager/user-manager.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserManagerComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ]
})
export class AdminModule { }
