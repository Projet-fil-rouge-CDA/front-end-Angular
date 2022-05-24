import {Injectable} from '@angular/core';
import {Weather} from "../models/weather.model";
import {NominatimAddress} from "../models/nominatim-response.model";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor() {
  }

  weathers: Weather[] = [
    {
      "id": 125,
      "weather_state_name": "Rain",
      "temperature": 17,
      "humidity": 18,
      "wind_speed": 50,
      "cloud_cover": 5,
      "rain": 10,
      "snow": 2,
      "liked": true,
      "city": {
        "city": "Nantes",
        "country": "France",
        "county": "Pays de la loire",
        "state": "Pays de la loire"
      },
      "clicked": false


    }, {
      "id": 365,
      "weather_state_name": "Clear",
      "temperature": 20,
      "humidity": 50,
      "wind_speed": 45,
      "cloud_cover": 10,
      "rain": 15,
      "snow": 5,
      "liked": true,
      "city":
        {
          "city": "Angers",
          "country": "France",
          "county": "Maine et loire",
          "state": "Pays de la loire"
        },
      "clicked": false

    }, {
      "id": 816,
      "weather_state_name": "Clouds",
      "temperature": 24,
      "humidity": 20,
      "wind_speed": 61,
      "cloud_cover": 23,
      "rain": 8,
      "snow": 4,
      "liked": true,
      "city": {
        "city": "Ancenis",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    }, {
      "id": 925,
      "weather_state_name": "Thunderstorm",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Le Mans",
        "country": "France",
        "county": "Sarthe",
        "state": "Pays de la loire"
      },
      "clicked": false
    }, {
      "id": 925,
      "weather_state_name": "Clouds",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Oudon",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    },{
      "id": 925,
      "weather_state_name": "Clouds",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Oudon",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    },{
      "id": 925,
      "weather_state_name": "Clouds",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Oudon",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    },{
      "id": 925,
      "weather_state_name": "Clouds",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Oudon",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    },{
      "id": 925,
      "weather_state_name": "Clouds",
      "temperature": 23,
      "humidity": 42,
      "wind_speed": 16,
      "cloud_cover": 28,
      "rain": 11,
      "snow": 9,
      "liked": true,
      "city": {
        "city": "Oudon",
        "country": "France",
        "county": "Loire-Atlantique",
        "state": "Pays de la loire"
      },
      "clicked": false
    }
  ]


  getWeathersLiked(): Weather[] {
    return this.weathers.filter((weather: Weather) => {
      return weather.liked;
    });
  }


}
