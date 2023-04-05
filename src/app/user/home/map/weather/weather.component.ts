import {Component, NgZone, OnInit} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/models/weather.model";
import {MapService} from "../../../../shared/services/map.service";
import {Subscription} from "rxjs";
import {LikeService} from "../../../../shared/services/like.service";
import {TokenService} from "../../../../shared/services/token.service";


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
    showMessage: boolean = false;
    textMessage: string = "Station ajoutée avec succès à vos favoris";
    stationAlreadyLiked: String[] = [];


    constructor(private weatherService: WeatherService, private mapService: MapService, private zone: NgZone, private likeService: LikeService, private tokenService: TokenService) {
    }

    ngOnInit(): void {
        this.likeService.getFavoritesLikes(this.tokenService.takePseudo()).subscribe((s) => {
            s.map(c => {
                this.stationAlreadyLiked.push(c.code)
            })
        })
        this.weatherSubscription.add(this.mapService.citySelected.subscribe(city => {
            this.zone.run(() => {
                this.weather = city;
            });
            if (this.weather) this.weatherService.getWeather(this.weather.latitude, this.weather.longitude).subscribe((data: any) => {
                this.zone.run(() => {
                    this.w = data;
                    if(this.station != null && this.w != null){
                        if(this.stationAlreadyLiked.includes(this.station.code)){
                            this.w.liked = true;
                        }
                    }
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


    addFavorite(nomStation: string) {
        this.w.liked = !this.w.liked
        this.likeService.addFavoritesLikes(nomStation, this.tokenService.takePseudo(), this.w.liked)
        this.showMessage = true;
    }


    ngOnDestroy(): void {
        this.weatherSubscription.unsubscribe();

    }
}
