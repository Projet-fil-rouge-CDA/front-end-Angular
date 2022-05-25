import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import {HomeComponent} from "./home/home.component";
import {ListComponent} from "./likes/list/list.component";
import {StationComponent} from "./home/map/station/station.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'likes', component: ListComponent},
  { path: 'station', component: StationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
