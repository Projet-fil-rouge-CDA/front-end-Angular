import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NominatimResponse} from "../models/nominatim-response.model";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchAddressService {

  private static BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
  // Cette viewbox permet de limiter les résultats de la recherche à la région Pays de la Loire
  private static DEFAULT_VIEW_BOX: string = 'viewbox=-3.95508,48.53116,3.01025,46.31658';

  constructor(private http: HttpClient) { }

  addressLookup(address: string): Observable<NominatimResponse[]> {
    let url = `https://${SearchAddressService.BASE_NOMINATIM_URL}/search?format=json&q=${address}&${SearchAddressService.DEFAULT_VIEW_BOX}&bounded=1&countrycodes=fr&addressdetails=1&email=julienpicquet1@gmail.com&limit=5`;
    return this.http
      .get(url).pipe(
        map((data: any) => data.map((item: any) => new NominatimResponse(
            item.lat,
            item.lon,
            item.display_name,
          {city: item.address.city, country: item.address.country, county: item.address.county, state: item.address.state}
          ))
        )
      )
  }

}
