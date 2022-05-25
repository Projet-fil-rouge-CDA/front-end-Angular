import {Component, NgZone, OnInit} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/models/weather.model";
import {MapService} from "../../../../shared/services/map.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  s = this.mapService.citySelected;
  weather: NominatimResponse | null;
  station: any;
  w: Weather;
  weatherSubscription = new Subscription();

  constructor(private weatherService: WeatherService, private mapService: MapService, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.weatherSubscription.add(this.mapService.citySelected.subscribe(city => {
      this.zone.run(() => {
        this.weather = city;
      });
      if (this.weather) this.weatherService.getWeather(this.weather.latitude, this.weather.longitude).subscribe((data: any) => {
        this.zone.run(() => {
          this.w = data;
        });
      });
    }));
    this.weatherSubscription.add(this.mapService.stationSelected.subscribe(station => {
      this.station = station;
    }));
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

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe();

  }
}
