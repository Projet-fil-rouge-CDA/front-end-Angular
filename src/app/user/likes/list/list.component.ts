import {Component, Input, OnInit} from '@angular/core';
import {LikeService} from "../../../shared/services/like.service";
import {Weather} from "../../../shared/models/weather.model";
import {Title} from "@angular/platform-browser";
import {WeatherService} from "../../../shared/services/weather.service";
import {NominatimAddress, NominatimResponse} from "../../../shared/models/nominatim-response.model";
import {StationService} from "../../../shared/services/station.service";
import {AuthService} from "../../../shared/services/auth.service";
import {TokenService} from "../../../shared/services/token.service";
import {SearchAddressService} from "../../../shared/services/search-address.service";
import {delay, forkJoin, from, mergeMap, Subscription, tap, toArray} from "rxjs";
import {map} from "rxjs/operators";
import {PolluantService} from "../../../shared/services/polluant.service";
import {DatePipe} from "@angular/common";
import {FavortiteStationModels} from "../../../shared/models/favortite-station.models";


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    weathers: Weather[] = [];
    weathersLength: number;
    w: Weather;
    searchResults: NominatimResponse[] | undefined;
    loader: boolean = true;
    @Input() weather: NominatimAddress;
    stations: any = [];
    favorite : FavortiteStationModels[] = [];

    indices: object;
    indiceValue: string;
    indiceUnit: string;



    constructor(private stationService: StationService, private searchService: SearchAddressService, private likeService: LikeService, private title: Title, private weatherService: WeatherService, private tokenService: TokenService, private polluantService : PolluantService) {
    }



    ngOnInit(): void {
        this.title.setTitle("Univ'Air | Favoris");
        this.loader = true;
        this.likeService.getFavoritesLikes(this.tokenService.takePseudo()).subscribe(res => {
                this.stations = res;
                this.stations.forEach((station: any) => {
                    console.log(station)
                    this.polluantService.getOnePolluantByStation(24, 24,0, new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), "horaire", station.code).subscribe(res =>{
                        this.indices = res;
                        // @ts-ignore
                        if(this.indices.content != null){
                            // @ts-ignore
                            this.indices.content.some(indice => {
                                this.weatherService.getWeather(station.latitude, station.longitude).subscribe(res => {
                                    if(indice.valeur != null){
                                        const date = new Date(indice.date);
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const hour = date.getHours().toString().padStart(2, '0');
                                        this.favorite.push({
                                            nomStation: station.nomStation,
                                            codeStation: station.code,
                                            nomVille: indice.commune,
                                            temp: res.temperature,
                                            skyInfo:  res.weather_state_name,
                                            indiceAir: this.getSentenceInfoAir(parseFloat(indice.valeur.toFixed(2))),
                                            indiceValue: indice.valeur.toFixed(2),
                                            indiceUnite: indice.unite,
                                            indiceDate: `${day}/${month} à ${hour}h`,
                                            clicked: false
                                        })
                                    } else {
                                        this.favorite.push({
                                            nomStation: station.nomStation,
                                            codeStation: station.code,
                                            nomVille: indice.commune,
                                            temp: res.temperature,
                                            skyInfo:  res.weather_state_name,
                                            indiceAir: "N/A",
                                            indiceValue: 0,
                                            indiceUnite: "",
                                            indiceDate: "",
                                            clicked: false
                                        })
                                    }
                                })
                                return true;
                            })
                        } else{
                            this.indiceUnit = "relevé"
                            this.indiceValue = "Aucun"
                        }
                    })
                })
            this.loader = false;
            }
        )
    }





getWeatherClass(weather: string) {
        return this.weatherService.getWeatherClass(weather)
    }

    getWeatherClassMiniCard(weather: string) {
        return this.weatherService.getWeatherClassMiniCard(weather)
    }

    translateWeatherToFrench(weather: string) {
        return this.weatherService.translateWeatherToFrench(weather)
    }

    toggleFavorite(codeStation: string) {
        this.likeService.removeFavoritesLikes(codeStation, this.tokenService.takePseudo(), false).subscribe(c => {
            this.favorite.forEach(station => {
                if(station.codeStation == codeStation){
                    this.favorite.splice(this.favorite.indexOf(station), 1);
                }
            })
        })
    }

    getSentenceInfoAir(indiceValue : number) : string{
        if(indiceValue < 50){
            return  "Air correct"
        } else if (indiceValue < 80){
            return "Air dégradé"
        } else {
            return "Air mauvais"
        }
    }

}

