import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Weather} from "../models/weather.model";
import {Observable} from "rxjs";
import {NominatimResponse} from "../models/nominatim-response.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

    getWeather(lat: number, lon: number, city?: NominatimResponse): Observable<Weather> {
        let url = `http://localhost:8080/api/meteo/get?latitude=${lat}&longitude=${lon}`;
        return this.http.get(url).pipe(map((data: any) => {
            return new Weather({
                id: data.id,
                descriptionTemps: data.temps,
                temperature: data.temperature,
                visibilite: data.visibilite,
                vitesseVent: data.vitesseVent,
                nuage: data.nuage,
                pluie: data.pluie,
                neige: data.neige,
                liked: data.liked,
                ville: data.ville,
                city: city,
                date: new Date(data.date),
                stations: data.stations
            });
        }));
    }


  getWeatherClass(weather: string): string {
    switch (weather) {
      case 'Clear':
        return 'blue-gradient-background';
      case 'Clouds':
        return 'grey-gradient-background';
      case 'Snow':
        return 'white-gradient-background';
      case 'Rain':
        return 'grey-gradient-background';
      case 'Thunderstorm':
        return 'dark-grey-gradient-background';
      default:
        return 'white-gradient-background';
    }
  }
  getWeatherClassMiniCard(weather: string): string {
    switch (weather) {
      case 'Clear':
        return 'blue-gradient-background-mini-card';
      case 'Clouds':
        return 'grey-gradient-background-mini-card';
      case 'Snow':
        return 'white-gradient-background-mini-card';
      case 'Rain':
        return 'grey-gradient-background-mini-card';
      case 'Thunderstorm':
        return 'dark-grey-gradient-background-mini-card';

      default:
        return 'white-gradient-background';
    }
  }

  translateWeatherToFrench(weather: string): string {
    switch (weather) {
      case 'Clear':
        return 'Ciel dégagé';
      case 'Clouds':
        return 'Nuageux';
      case 'Snow':
        return 'Neige';
      case 'Rain':
        return 'Pluvieux';
      case 'Thunderstorm':
        return 'Orageux';
      default:
        return 'Inconnu';
    }
  }

}
