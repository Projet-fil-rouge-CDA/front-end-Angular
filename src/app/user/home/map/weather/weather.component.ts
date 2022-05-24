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
  getWeatherClass(weather:string){
    return this.weatherService.getWeatherClass(weather)
  }
  translateWeatherToFrench(weather:string){
    return this.weatherService.translateWeatherToFrench(weather)
  }

  ngOnChanges(): void {

    if(this.weather)
    this.weatherService.getWeather(this.weather.latitude, this.weather.longitude).subscribe(
      (data: any) => {
        this.w = data;
      }
    );

  }

  toggleFavorite() {
this.w.liked = !this.w.liked
  }
}
