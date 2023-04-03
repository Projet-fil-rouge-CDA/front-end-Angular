import {Injectable} from '@angular/core';
import {Weather} from "../models/weather.model";
import {NominatimAddress} from "../models/nominatim-response.model";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor() {
  }

  private weathers: Weather[];

  getWeathersLiked(): Weather[] {
    return this.weathers.filter((weather: Weather) => {
      return weather.liked;
    });
  }


}
