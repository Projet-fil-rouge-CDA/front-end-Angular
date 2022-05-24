import {Component, OnInit} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/models/weather.model";
import {MapService} from "../../../../shared/services/map.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  weather: NominatimResponse;
  station: any;
  w: Weather;

  constructor(private weatherService: WeatherService, private mapService: MapService) {
  }

  ngOnInit(): void {
    this.mapService.citySelected.subscribe(city => {
      this.weather = city;
      if (this.weather) this.weatherService.getWeather(this.weather.latitude, this.weather.longitude).subscribe((data: any) => {
        this.w = data;
      });
    });
    this.mapService.stationSelected.subscribe(station => {
      this.station = station;
    });
  }

  getWeatherClass(weather: string) {
    return this.weatherService.getWeatherClass(weather)
  }

  translateWeatherToFrench(weather: string) {
    return this.weatherService.translateWeatherToFrench(weather)
  }

  addFavorite() {
    this.w.liked = !this.w.liked
  }
}
