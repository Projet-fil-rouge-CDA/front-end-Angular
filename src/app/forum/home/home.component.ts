import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { ForumService } from '../../shared/services/forum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postForm: any;

  constructor(
    private formBuilder : FormBuilder,
    private titleService : Title,
    private serviceForum : ForumService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, ValidationService.selectCategory]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Forum');
    this.serviceForum.getPost().subscribe()
  }

  newPost(){
    if(this.postForm.dirty && this.postForm.valid){
      // let findLink = this.postForm.value.message.split(" ");
      // for(let i = 0; i< findLink.length, i++;){
      //   if(findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")){
      //     let embed = findLink[i].replace("watch?v=", "embed/");
      //     let video = embed.split('&')[0]
      //     video.splice(i, 1);
      //     console.log(video);
      //   }
      // }
      this.serviceForum.newPost(this.postForm.value)
    }
  }
}
