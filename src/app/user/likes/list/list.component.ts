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


    constructor(private stationService: StationService, private searchService: SearchAddressService, private likeService: LikeService, private title: Title, private weatherService: WeatherService, private tokenService: TokenService) {
    }



    ngOnInit(): void {
        this.title.setTitle("Univ'Air | Favoris");
        this.loader = true;
        this.likeService.getFavoritesLikes(this.tokenService.takePseudo()).pipe(
            tap((res) => { this.stations = res; console.log(res) }),
            mergeMap((res) => from(res)),
            mergeMap((c) => {
                return this.searchService.addressLookup(c.commune_nom).pipe(
                    map((data) => {
                        const displayName = data[0].displayName;
                        const address = data[0].address;
                        address.city = data[0].displayName.split(',')[0];
                        const latitude = parseFloat(String(data[0].latitude));
                        const longitude = parseFloat(String(data[0].longitude));
                        const nominatimResponse = new NominatimResponse(latitude, longitude, displayName, address);
                        return {
                            weather: this.weatherService.getWeather(c.latitude, c.longitude, nominatimResponse).pipe(delay(1000)),
                            city: nominatimResponse,
                        };
                    })
                );
            }),
            toArray()
        ).subscribe((results) => {
            const weatherObservables = results.map((r) => r.weather);
            forkJoin(weatherObservables).subscribe((weathers) => {
                this.weathers = weathers;
                this.weathersLength = weathers.length;
                this.searchResults = results.map((r) => r.city);
                this.loader = false;
            });
        });
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

    toggleFavorite(weatherLiked: Weather, nomStation: string) {
        this.likeService.removeFavoritesLikes(nomStation, this.tokenService.takePseudo(), false).subscribe(c => {
            this.weathers = this.weathers.filter((w) => w.city !== weatherLiked.city);
        })
    }


}

