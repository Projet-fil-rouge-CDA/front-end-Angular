import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FilsComponent} from "./fils/fils.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'fils', component: FilsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ForumRoutingModule {
}
