import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './post/add/add-post.component';
import { EditPostComponent } from './post/edit/edit-post.component';
import { ListComponent } from './post/list/list.component';
import { AddComponent } from './category/add/add.component';
import { EditComponent } from './category/edit/edit.component';
import {ForumRoutingModule} from "./forum-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponentForum } from '../shared/components/control-messages-forum.components';

@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent,
    EditPostComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    ControlMessagesComponentForum
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForumModule { }
