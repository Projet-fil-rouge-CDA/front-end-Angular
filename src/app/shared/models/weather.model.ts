import {NominatimAddress} from "./nominatim-response.model";

export class Weather {
    public id: number;
    public weather_state_name: string;
    public temperature: number;
    public humidity: number;
    public visibility: number;
    public wind_speed: number;
    public wind_direction: number;
    public cloud_cover: number;
    public rain: number;
    public snow: number;
    public city?: NominatimAddress;
    public date: Date;
    public stations: any[];
    public liked: boolean;
    public clicked: boolean = false;
    constructor(data: any) {
        this.id = data.id;
        this.weather_state_name = data.descriptionTemps;
        this.temperature = data.temperature;
        this.visibility = data.visibilite;
        this.wind_speed = data.vitesseVent;
        this.wind_direction = data.degresVent;
        this.cloud_cover = data.nuage;
        this.rain = data.pluie;
        this.snow = data.neige;
        this.city = data.ville;
        this.date = new Date(data.date);
        this.stations = data.stations;
        this.liked = false
    }
}
