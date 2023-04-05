import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FilsComponent} from "./fils/fils.component";
import {TalkingComponent} from "./talking/talking.component";
import {ForumAdministrationComponent} from "./forum-administration/forum-administration.component";
import {ForumAdministrationGuard} from "./forum-administration/forum-administration.guard";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'fils', component: FilsComponent},
    {path: 'fils/talking', component: TalkingComponent},
    {path: 'administration', component: ForumAdministrationComponent, canActivate: [ForumAdministrationGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ForumRoutingModule {
}
