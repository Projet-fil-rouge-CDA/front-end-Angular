import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Weather} from "../models/weather.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeather(lat: number, lon: number): Observable<Weather> {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=511625d50ec3f833cc94ee81b61298a2&units=metric`;
    return this.http.get(url).pipe(map((item: any) => {
      return new Weather(
        item.sys.id,
        item.weather[0].main,
        item.main.temp,
        item.main.humidity,
        item.wind.speed,
        item.clouds.all,
        item.main.humidity,
        item.main.humidity,
        item.liked);
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
