import {Injectable} from '@angular/core';
import {Weather} from "../models/weather.model";
import {NominatimAddress} from "../models/nominatim-response.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private httpClient: HttpClient) {
    }

    private apiURL: string = environment.urlApi + "/user/station/like";

    private weathers: Weather[];
    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // getWeathersLiked(): Weather[] {
    //     return this.weathers.filter((weather: Weather) => {
    //         return weather.liked;
    //     });
    // }
    getFavoritesLikes(pseudo:string):Observable<any[]>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.httpClient.get<any[]>(`${environment.urlApi}/user/station/get/like?pseudo=${pseudo}`, { headers });
    }



    addFavoritesLikes(nomStation: string, pseudo: string, add: boolean = true) {
        this.httpClient.post(this.apiURL + `?nomStation=${nomStation}&pseudo=${pseudo}&add=${add}`, {},
            this.httpHeaders).subscribe();

    }

    removeFavoritesLikes(nomStation: string, pseudo: string, add: boolean = false): Observable<any> {
        return this.httpClient.post(this.apiURL + `?nomStation=${nomStation}&pseudo=${pseudo}&add=${add}`, {},
            this.httpHeaders)

    }

}
