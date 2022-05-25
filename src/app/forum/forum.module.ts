import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './post/add/add-post.component';
import { EditPostComponent } from './post/edit/edit-post.component';
import { ListComponent } from './post/list/list.component';
import { AddComponent } from './category/add/add.component';
import { EditComponent } from './category/edit/edit.component';
import {ForumRoutingModule} from "./forum-routing.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent,
    EditPostComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForumModule { }
