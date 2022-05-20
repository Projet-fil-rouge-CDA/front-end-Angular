import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private _urlApi = environment.urlApi + '/users'

  users$ = new BehaviorSubject<Users[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  register(register : Users){
    console.log(register);
    if(register.password === register.confirmPassword){
      const data : Users = {firstname: register.firstname, lastname: register.lastname, phone: register.phone, email: register.email, password: register.password}
      return this.http.post<Users>(this._urlApi, data, this.httpHeaders)
    }
    return null
  }

  login(register : Users){
    if(register){
      console.log(register);
      return this.http.post<Users>(this._urlApi, register, this.httpHeaders)
    }
    return null
  }

  addAddress(address : Address){
    if(address){
      console.log(address);
      return this.http.post<Address>(this._urlApi, address, this.httpHeaders)
    }
    return null
  }
}
