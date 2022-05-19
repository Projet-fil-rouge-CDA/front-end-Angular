import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  getStations() {
    return this.http.get('https://data.airpl.org/api/v1/mesure/journaliere/?&code_configuration_de_mesure__code_point_de_prelevement__code_polluant=24&date_heure_tu__range=2021-5-19,2022-5-19&code_configuration_de_mesure__code_point_de_prelevement__code_station__code_commune__code_departement__in=44,49,53,72,85,&export=json');
  }
}
