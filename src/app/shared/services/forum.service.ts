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

    private _urlApi = environment.urlApi + '/forum'
    private _urlApiCategory = this._urlApi + '/categories'
    private _urlApiComment = this._urlApi + '/post/commentaire'
    private _urlApiUsers = environment.urlApi + '/admin/users'

    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'https://univair.herokuapp.com'

        }),
        body: {
            "identifier": "admin",
            "motDePasse": "admin"
        }
    }

    constructor(
        private http: HttpClient
    ) {
    }

    getPosts(category: string) {
        return this.http.get<Post>(this._urlApi + "/" + category + "/posts/get", this.httpHeaders)
    }

    getSpecificPost(id: any) {
        return this.http.get<Post>(`${this._urlApi}/post/get?idPost=${id}`, this.httpHeaders)
    }

    getCategories() {
        return this.http.get<Category>(`${this._urlApiCategory}/get`, this.httpHeaders)
    }

    createCategory(category: Category) {
        return this.http.post<Category>(`${environment.urlApi}/admin/categorie/create`, category, this.httpHeaders)
    }

    changeActiveCategory(active:boolean, id:number) {
        return this.http.post<Category>(`${environment.urlApi}/admin/categorie/active?estActive=${active}&idCategorie=${id}` ,  this.httpHeaders)
    }

    postComment(comment: Comment) {
        return this.http.post<Comment>(`${this._urlApiComment}/create`, comment, this.httpHeaders)
    }

    deleteComment(id: any) {
        return this.http.delete<Comment>(`${this._urlApiComment}/delete?idCommentaire=${id}`, this.httpHeaders)
    }

    postPost(post: Post) {
        return this.http.post<Post>(`${this._urlApi}/post/create`, post, this.httpHeaders)
    }

    deletePost(id: any) {
        return this.http.delete<Post>(`${this._urlApi}/post/delete?idPost=${id}`, this.httpHeaders)
    }

    updateUser( pseudo:string, actif:boolean) {
        return this.http.post<any>(`${environment.urlApi}/admin/utilisateur?estActif=${actif}&pseudo=${pseudo}` , this.httpHeaders)
    }

    getUsers() {
        return this.http.get<any>(`${this._urlApiUsers}/get`, this.httpHeaders)
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
