import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagerComponent} from "./user-manager/user-manager.component";
import {AdminGuard} from "./admin.guard";

const routes: Routes = [
    { path: '', redirectTo: 'user-manager'},
    { path: 'user-manager', component: UserManagerComponent, canActivate: [AdminGuard]},
    { path: '**', redirectTo: 'user-manager'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
