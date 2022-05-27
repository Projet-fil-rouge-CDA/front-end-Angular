import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  postForm: any;

  constructor(
    private formBuilder : FormBuilder,
    private titleService : Title,
    private router : Router
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Forum');
  }

  newPost(){
    console.log("salut");
  }

}
