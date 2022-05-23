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

  // Permet de s'enregistrer sur l'appli
  register(register : Users){
    console.log(register);
    if(register.password === register.confirmPassword){
      const data : Users = {firstname: register.firstname, lastname: register.lastname, phone: register.phone, email: register.email, password: register.password, isActif: true}
      this.http.post<Users>(this._urlApi, data, this.httpHeaders).subscribe(res => {
        if(res == null){
          // problème lors de l'enregistrement
          return 'ProbRegister'
        } else {
          this.login(data)
          return console.log('Regisgood');
        }
      })
    }
  }

  // Permet de se connecter
  login(login : Users){
    let data;
    // Permet de savoir si un phone ou un email a été placé comme identifiant
    if(login.email.valueOf().match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[5-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)){
      data = {phone: login.email, password: login.password}
    } else {
      data = {email: login.email, password: login.password}
    }
    console.log(data);
    if(!data){
      return console.log('ProbLogIdent');
    } else{
      this.http.post<Users>(this._urlApi, data, this.httpHeaders).subscribe(res => {
        if(res == null){
          // problème lors de la connection
          return console.log('ProbLogin');
        } else{
          return console.log("logGood");
          // cookie + redirect add-address
        }
      })
    }
  }

  // Ajout de l'adresse principale pour un nouveau compte
  addAddress(address : Address){
    // prendre cookie + envoyer dans le post avec l'adresse
    console.log(address);
    this.http.post<Address>(this._urlApi, address, this.httpHeaders).subscribe(res => {
      if(res == null){
        // problème lors de l'enregistrement de l'adresse
        return console.log('ProbAddress');
      } else {
        //redirect /user
        return console.log('addressGood');
      }
    })
  }
}
