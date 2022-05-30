import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private _urlApi = environment.urlApi + '/post'
  private _urlApiCategory = environment.urlApi + '/category'

  private posts : any;
  private categories: any;

  constructor(
    private http: HttpClient
  ) {}

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  newPost(post : Post){
    console.log(post);
    return this.http.post<Post>(this._urlApi, post, this.httpHeaders).subscribe()
  }

  getPosts(){
    return this.http.get<Post>(this._urlApi, this.httpHeaders)
  }

  getCategories(){
    return this.http.get<Category>(this._urlApiCategory , this.httpHeaders)
  }
}
