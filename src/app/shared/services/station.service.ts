import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

  getStations() {
    return this.http.get('https://data.airpl.org/api/v1/mesure/station-geojson/').pipe(
      map((data: any) => {
        return data
      })
    );
  }
}
