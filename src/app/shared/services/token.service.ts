import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
      private cookieService : CookieService
  ) {}

    takePseudo() : any{
        // @ts-ignore
        return jwt_decode(this.cookieService.get('session')).pseudo
    }

    takeNom() : any{
        // @ts-ignore
        return jwt_decode(this.cookieService.get('session')).nom
    }
    takePrenom() : any{
        // @ts-ignore
        return jwt_decode(this.cookieService.get('session')).prenom
    }

    takeRoles() : any{
        // @ts-ignore
        return jwt_decode(this.cookieService.get('session')).roles
    }
}
