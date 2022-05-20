import {Component, Input, OnInit} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/models/weather.model";
import {StationService} from "../../../../shared/services/station.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  @Input() weather: NominatimResponse;
  @Input() station: string;
  constructor(private weatherService: WeatherService, private stationService: StationService) { }
  w: Weather;


  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.weather)
    this.weatherService.getWeather(this.weather.latitude, this.weather.longitude).subscribe(
      (data: any) => {
        this.w = data;
      }
    );
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
      default:
        return 'Inconnu';
    }
  }

}
