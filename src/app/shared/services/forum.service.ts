import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private _urlApi = environment.urlApi + '/post'

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

  getPost(){
    return this.http.get<Post>(this._urlApi, this.httpHeaders)
  }
}
