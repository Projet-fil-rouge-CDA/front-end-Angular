import {Injectable} from '@angular/core';
import * as L from "leaflet";
import {GeoJSON, icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from "leaflet";
import {MapPoint} from "../models/map-point.model";
import {NominatimResponse} from "../models/nominatim-response.model";
import {HttpClient} from "@angular/common/http";
import {StationService} from "./station.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  layer: Array<GeoJSON> = [];
  station: Array<any> = [];
  stationSelected: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  citySelected: BehaviorSubject<NominatimResponse | null> = new BehaviorSubject<NominatimResponse | null>(null);

  constructor(private http: HttpClient, private stationService: StationService) {
  }

  /**
   * Initialisation de l'icône marker
   * @private
   */
  private static getDefaultIcon() {
    return icon({
      iconSize: [25, 41], iconAnchor: [13, 41], iconUrl: 'assets/marker-icon.png'
    });
  }

  /**
   * Calcule la distance entre deux points (en km.)
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   */
  private static getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = MapService.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = MapService.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(MapService.deg2rad(lat1)) * Math.cos(MapService.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
  }

  /**
   * Convertit une valeur en degrés en radians
   * @param deg
   */
  private static deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  /**
   * Initialisation des contours de la région Pays de la Loire sur la carte
   */
  initializeCountyLayer(): GeoJSON[] {
    if(this.layer.length === 0)
    this.http.get('assets/data/234400034_contours-paysdelaloire.geojson').subscribe((json: any) => {
      this.layer.push(L.geoJSON(json, {
        style: {
          color: 'rgba(148,148,152,0.41)', fillOpacity: 0.7, weight: 2
        },
      }))
    });
    return this.layer
  }

  /**
   * Initialisation des stations sur la carte sous forme de cercle
   * Nécessite une API officielle de l'État (data.gouv.fr)
   */
  initializeCircleStation() {
    if (this.station.length === 0) {
      this.subscribeToStations();
    } else {
      this.station = [];
      this.subscribeToStations();
    }
  }

  subscribeToStations() {
    return this.stationService.getStations().subscribe(station => {
      station.filter((item: any) => item.etat === 'EN SERVICE').forEach((item: any) => {
        this.station.push(item);
      });
      this.station.map((item: any) => {
        L.circleMarker([item.latitude, item.longitude], {
          radius: 10, color: '#5d9f07', fillColor: 'rgba(36,152,5,0.32)', fillOpacity: 0.5,
        }).bindPopup('Station ' + item.nom).on('click', (e: LeafletMouseEvent) => {
          this.citySelected.next(new NominatimResponse(item.latitude, item.longitude, item.nom, {
            city: item.commune_nom,
            country: 'France',
            county: item.code_departement,
            state: 'Pays de la Loire',
          }));
          this.stationSelected.next(item);
          this.mapPoint = {latitude: item.latitude, longitude: item.longitude, name: item.nom};
          this.createMarker();
        }).addTo(this.map);
      });
    });
  }


  /**
   * Initialisation de la carte
   */
  initializeMap(map: Map) {
    this.map = map;
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.map.setView(coordinates, this.map.getZoom());
    this.map.zoomControl.setPosition('bottomleft');
  }

  /**
   * Actions à faire lorsque l'utilisateur clique sur un point sur la carte
   * @param e
   */
  onMapClick(e: LeafletMouseEvent) {
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
    this.getNearestStation(e.latlng.lat, e.latlng.lng);
  }

  /**
   * Permet de mettre à jour la carte et créer un nouveau marker
   * @param result
   */
  getAddress(result: NominatimResponse) {
    this.citySelected.next(result);
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  /**
   * Récupère la station la plus proche par rapport à la position sur la carte
   * @param lat
   * @param lng
   */
  getNearestStation(lat: number, lng: number) {
    const station = this.station.reduce((prev, curr) => {
      const prevDist = MapService.getDistance(prev.latitude, prev.longitude, lat, lng);
      const currDist = MapService.getDistance(curr.latitude, curr.longitude, lat, lng);
      return prevDist < currDist ? prev : curr;
    });
    this.stationSelected.next(station);
  }

  /**
   * Permet d'initialiser les options de la carte
   * @private
   */
  initializeMapOptions() {
    return this.options = {
      zoom: 8, layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: 'OSM', minZoom: 8,
      })]
    }
  }

  /**
   * Permet d'initialiser la position de départ de la carte
   */
  initializeDefaultMapPoint() {
    return this.mapPoint = {
      name: 'Pays de la Loire', latitude: 47.478419, longitude: -0.563166
    };
  }

  /**
   * Permet de mettre à jour la position de la carte
   * @param latitude
   * @param longitude
   * @param name
   */
  updateMapPoint(latitude: number, longitude: number, name?: string) {
    return this.mapPoint = {
      latitude: latitude, longitude: longitude, name: name ? name : this.mapPoint.name
    };
  }

  /**
   * Permet de supprimer tous les marqueurs de la carte
   */
  clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

  /**
   * Permet de créer un marker sur la carte
   */
  private createMarker() {
    this.clearMap();
    const mapIcon = MapService.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, 16);
  }

}
