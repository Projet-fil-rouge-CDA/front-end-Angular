import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {ForumRoutingModule} from "./forum-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlMessagesComponentForum} from '../shared/components/control-messages-forum.components';
import {FilsComponent} from './fils/fils.component';
import {TalkingComponent} from './talking/talking.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalComponent as ModalComponent} from './modal/modal.component';
import {MatInputModule} from "@angular/material/input";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [
        HomeComponent,
        ControlMessagesComponentForum,
        FilsComponent,
        TalkingComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        ForumRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        NgxSkeletonLoaderModule
    ]
})
export class ForumModule {
}
