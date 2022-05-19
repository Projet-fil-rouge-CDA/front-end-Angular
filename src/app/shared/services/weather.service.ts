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
        item.main.humidity);
    }));
  }
}
