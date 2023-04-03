import { Injectable } from '@angular/core';
import {Users} from "../shared/models/users";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {optionUser} from "../shared/models/optionUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private _urlApi = environment.urlApi;

    constructor(
      private http: HttpClient
    ) {}

    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // @ts-ignore
    getInfoOption(pseudo : string) {
        return this.http.get<optionUser>(this._urlApi+"/user/option/get?pseudo="+pseudo, this.httpHeaders);
    }

    verificationPseudoAvailable(pseudo : string) : Observable<boolean>{
        return this.http.get<boolean>(this._urlApi+"/user/option/pseudo?pseudo="+pseudo, this.httpHeaders);
    }

    updateInfoOption(pseudo: string, user : optionUser) : Observable<any>{
        return this.http.post<any>(this._urlApi+"/user/option/update?pseudo="+pseudo, user, this.httpHeaders);
    }
}
