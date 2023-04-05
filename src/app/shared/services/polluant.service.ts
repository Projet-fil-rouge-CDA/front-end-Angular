import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PolluantService {

    constructor(private http: HttpClient) {
    }

    getOnePolluantByStation(codePolluant: any, limit: number, offset: number, dateDebut: string | null, dateFin: string | null, mesure: string, codeStation: string) {
        return this.http.get(`http://localhost:8080/api/station/${codeStation}/${codePolluant}`,
            {
                params: {
                    'dateDebut': dateDebut != null ? dateDebut : '',
                    'dateFin': dateFin != null ? dateFin : '',
                    'metrique': mesure,
                    'page': offset + 1,
                    'size': limit
                }
            });
    }

    getCategoryPolluant(nomStation: string): Observable<any>{
        return this.http.get(environment.urlApi + "/polluants/" + nomStation);
    }
}
