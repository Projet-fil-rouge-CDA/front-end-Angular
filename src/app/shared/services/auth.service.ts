import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, firstValueFrom, throwError} from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {Token} from "@angular/compiler";
import {TokenService} from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlApi = environment.urlApi;

  isAuth$ = new BehaviorSubject<boolean>(false)
  isAdmin$ = new BehaviorSubject<boolean>(false)
  isModerator$ = new BehaviorSubject<boolean>(false)
  users$ = new BehaviorSubject<Users>({prenom: '', nom: '', phone: 0, email: '', motDePasse: '', isActif: false, address: {rue: '', codePostal: 0, ville: ''}});
  role$ = new BehaviorSubject<String>('user')

  constructor(
    private http: HttpClient,
    private cookieService : CookieService,
    private router : Router,
    private tokenService : TokenService
  ) {
    if(this.cookieService.check('session')){
      this.isAuth$.next(true);
        let roles : String[] = this.tokenService.takeRoles();
        roles.map(role => {
            if(role === "ADMINISTRATEUR"){
                this.isAdmin$.next(true);
            }
            if(role === "MODERATEUR"){
                this.isModerator$.next(true);
            }
        })
    }
  }

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Permet de s'enregistrer sur l'appli
  register(user : Users){
    this.http.post<Users>(this._urlApi + "/register", user, this.httpHeaders).subscribe(res => {
      if(res == null){
        // problème lors de l'enregistrement
        return 'ProbRegister'
      } else {
        return this.login(user);
      }
    })
  }

  // Permet de se connecter
  async login(user : Users) {
    let dataLog;
    // Permet de savoir si un phone ou un email a été placé comme identifiant
    if(user.email.valueOf().match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[6-7](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)){
        dataLog = {identifiant: user.email, motDePasse: user.motDePasse}
    } else {
        dataLog = {identifiant: user.email, motDePasse: user.motDePasse}
    }
    try {
      const res = await firstValueFrom(this.http.post<any>(this._urlApi + "/login", dataLog, this.httpHeaders));
      if (res == null) {
          return;
      } else {
          this.cookieService.set('session', res.value);
          let roles : String[] = this.tokenService.takeRoles();
          roles.map(role => {
              if(role === "ADMINISTRATEUR"){
                  this.isAdmin$.next(true);
              }
              if(role === "MODERATEUR"){
                  this.isModerator$.next(true);
              }
          })
          this.isAuth$.next(true);
          this.router.navigate(['/user']);
      }
    } catch (error) {
      throw error;
    }
  }

  // Permet de se déconnecter
  logout(){
    this.cookieService.delete('session');
    this.role$.next('user');
    this.isAuth$.next(false);
    this.isAdmin$.next(false);
    this.isModerator$.next(false);
  }
}
