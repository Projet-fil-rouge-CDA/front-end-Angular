import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from 'src/app/shared/models/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _urlApi = environment.urlApi + '/users'

  users$ = new BehaviorSubject<Register[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  register(register : Register){
    console.log(register);
    if(register.password === register.confirmPassword){
      const data : Register = {firstname: register.firstname, lastname: register.lastname, phone: register.phone, email: register.email, password: register.password}
      return this.http.post<Register>(this._urlApi, data, this.httpHeaders)
    }
    return null
  }

  login(register : Register){
    if(register){
      console.log(register);
      return this.http.post<Register>(this._urlApi, register, this.httpHeaders)
    }
    return null
  }
}
