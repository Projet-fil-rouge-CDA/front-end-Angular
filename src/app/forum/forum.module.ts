import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ForumRoutingModule} from "./forum-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlMessagesComponentForum} from '../shared/components/control-messages-forum.components';
import {FilsComponent} from './fils/fils.component';

@NgModule({
    declarations: [
        HomeComponent,
        ControlMessagesComponentForum,
        FilsComponent
    ],
    imports: [
        CommonModule,
        ForumRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ForumModule {
}
