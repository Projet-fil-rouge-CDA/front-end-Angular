import {Component, Input, OnInit} from '@angular/core';
import {LikeService} from "../../../shared/services/like.service";
import {Weather} from "../../../shared/models/weather.model";
import {Title} from "@angular/platform-browser";
import {WeatherService} from "../../../shared/services/weather.service";
import {NominatimAddress, NominatimResponse} from "../../../shared/models/nominatim-response.model";
import {StationService} from "../../../shared/services/station.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  weathers: Weather[] = []


  @Input() weather: NominatimAddress;


  constructor(private stationService: StationService, private likeService: LikeService, private title: Title, private weatherService: WeatherService) {
  }


  ngOnInit(): void {
    this.title.setTitle("Univ'Air | Favoris")
    this.weathers = this.likeService.getWeathersLiked()

  }



  getWeatherClass(weather:string){
    return this.weatherService.getWeatherClass(weather)
  }
  translateWeatherToFrench(weather:string){
    return this.weatherService.translateWeatherToFrench(weather)
  }

}
