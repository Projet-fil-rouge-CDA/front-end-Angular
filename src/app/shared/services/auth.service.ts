import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _urlApi = environment.urlApi;

  isAuth$ = new BehaviorSubject<boolean>(false)
  users$ = new BehaviorSubject<Users>({prenom: '', nom: '', phone: 0, email: '', motDePasse: '', isActif: false, address: {rue: '', codePostal: 0, ville: ''}});
  role$ = new BehaviorSubject<String>('user')

  constructor(
    private http: HttpClient,
    private cookieService : CookieService,
    private router : Router
  ) {
    if(this.cookieService.check('session')){
      this.isAuth$.next(true);
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
  login(user : Users){
    let dataLog;
    // Permet de savoir si un phone ou un email a été placé comme identifiant
    if(user.email.valueOf().match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[6-7](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)){
      dataLog = {identifiant: user.email, motDePasse: user.motDePasse}
    } else {
      dataLog = {identifiant: user.email, motDePasse: user.motDePasse}
    }
    this.http.post<any>(this._urlApi + "/login", dataLog, this.httpHeaders).subscribe(res => {
      if(res == null){
        // problème lors de la connection
        return console.log('ProbLogin');
      } else{
        this.cookieService.set('session', res.value);
        this.role$.next('admin') // recupérer le rôle du back et le mettre à jour
        this.isAuth$.next(true);
        return this.router.navigate(['/user']);
      }
    })
  }

  // Permet de se déconnecter
  logout(){
    this.cookieService.delete('session');
    this.role$.next('user');
    this.isAuth$.next(false);
  }
}
