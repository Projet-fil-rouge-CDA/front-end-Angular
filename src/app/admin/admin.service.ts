import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserManagerModel} from "../shared/models/user-manager.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    private _urlApi = environment.urlApi+"/admin";

  constructor(
      private http: HttpClient
  ) {}

    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getAllUser() : Observable<any> {
      return this.http.get(this._urlApi+"/users/get", this.httpHeaders);
    }

    updateUser(user : UserManagerModel){
      this.http.post<any>(this._urlApi+"/user/update", user, this.httpHeaders).subscribe();
    }
}
