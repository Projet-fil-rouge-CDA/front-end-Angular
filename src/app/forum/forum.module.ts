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
import {NewPostComponent as ModalComponent} from './forum-includes/new-post/new-post.component';
import {MatInputModule} from "@angular/material/input";
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { ImageViewerComponent } from './forum-includes/image-viewer/image-viewer.component';
import {MatCardModule} from "@angular/material/card";
import { ForumAdministrationComponent } from './forum-administration/forum-administration.component';

@NgModule({
    declarations: [
        HomeComponent,
        ControlMessagesComponentForum,
        FilsComponent,
        TalkingComponent,
        ModalComponent,
        ImageViewerComponent,
        ForumAdministrationComponent
    ],
    imports: [
        CommonModule,
        ForumRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        NgxSkeletonLoaderModule,
        MatCardModule
    ]
})
export class ForumModule {
}
