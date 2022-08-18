import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Category} from '../models/category';
import {Post} from '../models/post';
import {Comment} from '../models/comment';

@Injectable({
    providedIn: 'root'
})
export class ForumService {

    private _urlApi = environment.urlApi + '/post'
    private _urlApiCategory = environment.urlApi + '/category'
    private _urlApiComment = environment.urlApi + '/commentaire'
    private _urlApiUsers = environment.urlApi + '/users'

    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(
        private http: HttpClient
    ) {
    }

    getPosts() {
        return this.http.get<Post>(this._urlApi, this.httpHeaders)
    }

    getCategories() {
        return this.http.get<Category>(this._urlApiCategory, this.httpHeaders)
    }

    getComments() {
        return this.http.get<Comment>(this._urlApiComment, this.httpHeaders)
    }

    postComment(comment: Comment) {
        return this.http.post<Comment>(this._urlApiComment, comment, this.httpHeaders)
    }

    deleteComment(id: any) {
        return this.http.delete<Comment>(this._urlApiComment + '/' + id, this.httpHeaders)
    }

    getUsers() {
        return this.http.get<any>(this._urlApiUsers, this.httpHeaders)
    }

    // uploadImage(image: File) {
    //     const formData = new FormData()
    //     formData.append('image', image)
    //     console.log("formdata",formData)
    //     console.log("image",image)
    //     return this.http.post<any>('assets/img/' + image.name, formData)

        // return this.http.post('assets/img/', image)
    // }

}
