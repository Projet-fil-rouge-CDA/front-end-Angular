import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import {HomeComponent} from "./home/home.component";
import {ListComponent} from "./likes/list/list.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate : [AuthGuard]},
  { path: 'likes', component: ListComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
