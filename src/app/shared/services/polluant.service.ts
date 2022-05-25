import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PolluantService {

  constructor(private http: HttpClient) {
  }

  getAllPolluants(codePolluant: any, limit: number, offset: number, dateDebut: string | null, dateFin: string | null, mesure: string, codeStation: string) {
    return this.http.get(`https://data.airpl.org/api/v1/mesure/${mesure}/`,
      {
        params: {
          'count': true,
          'limit': limit,
          'offset': offset,
          'code_configuration_de_mesure__code_point_de_prelevement__code_polluant': codePolluant,
          'date_heure_tu__range': dateDebut + ',' + dateFin,
          'code_configuration_de_mesure__code_point_de_prelevement__code_station': codeStation,
        }
      });
  }
}
