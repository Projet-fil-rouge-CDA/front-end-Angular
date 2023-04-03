import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) { }

    urlApp = environment.urlApi + '/stations'

  getStations() {
    return this.http.get(this.urlApp).pipe(
      map((data: any) => {
        return data
      })
    );
  }
}
