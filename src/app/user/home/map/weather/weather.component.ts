import {Component, NgZone, OnInit} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {WeatherService} from "../../../../shared/services/weather.service";
import {Weather} from "../../../../shared/models/weather.model";
import {MapService} from "../../../../shared/services/map.service";
import {Subscription} from "rxjs";
import {LikeService} from "../../../../shared/services/like.service";
import {TokenService} from "../../../../shared/services/token.service";
import {PolluantService} from "../../../../shared/services/polluant.service";
import {DatePipe} from "@angular/common";


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

    indices : object;
    indiceValue: string;
    indiceUnit: string;
    indiceDate: string;
    indiceAir : string;

    constructor(private weatherService: WeatherService, private mapService: MapService, private zone: NgZone, private likeService: LikeService, private tokenService: TokenService, private polluantService : PolluantService) {
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
            if(this.station != null)
            this.polluantService.getOnePolluantByStation(24, 24,0, new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), "horaire", this.station.code).subscribe(res =>{
                this.indices = res;
                // @ts-ignore
                if(this.indices.content != null){
                    // @ts-ignore
                    this.indices.content.some(indice => {
                        if(indice.valeur != null){
                            this.indiceValue = indice.valeur.toFixed(2);
                            this.indiceUnit = indice.unite;
                            const date = new Date(indice.date);
                            const day = date.getDate().toString().padStart(2, '0');
                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                            const hour = date.getHours().toString().padStart(2, '0');
                            this.indiceDate = `${day}/${month} à ${hour}h`;
                            return true;
                        }
                    })
                    this.getSentenceInfoAir(parseFloat(this.indiceValue));
                } else{
                    this.indiceUnit = "relevé"
                    this.indiceValue = "Aucun"
                }
            })
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

    getSentenceInfoAir(indiceValue : number){
        if(indiceValue < 50){
            this.indiceAir = "Air correct"
        } else if (indiceValue < 80){
            this.indiceAir = "Air dégradé"
        } else {
            this.indiceAir = "Air mauvais"
        }
    }
}
