import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';
import {control, GeoJSON, icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';
import {MapPoint} from "../../../shared/models/map-point.model";
import {NominatimResponse} from "../../../shared/models/nominatim-response.model";
import {HttpClient} from "@angular/common/http";
import {StationService} from "../../../shared/services/station.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  layer: Array<GeoJSON> = [];
  station: Array<any> = [];
  citySelected: any;
  stationSelected: any;
  results: NominatimResponse;

  constructor(private http: HttpClient, private stationService: StationService) {
  }

  /**
   * Initialisation de l'icône marker
   * @private
   */
  private static getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  ngOnInit() {
    this.initializeCountyLayer();
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
    this.initializeCircleStation();
  }

  /**
   * Initialisation des contours de la région Pays de la Loire sur la carte
   */
  initializeCountyLayer() {
    this.http.get('assets/data/234400034_contours-paysdelaloire.geojson').subscribe((json: any) => {
      this.layer.push(L.geoJSON(json, {
        style: {
          color: 'rgba(148,148,152,0.41)',
          fillOpacity: 0.7,
          weight: 2
        },
      }));
    });
  }

  /**
   * Initialisation des stations sur la carte sous forme de cercle
   * Nécessite une API officielle de l'État (data.gouv.fr)
   */
  initializeCircleStation() {
    this.stationService.getStations().subscribe(station => {
      station.features.filter((item: any) => item.etat === 'EN SERVICE').forEach((item: any) => {
        this.station.push(item);
      });
      this.station.forEach((item: any) => {
        L.circleMarker([item.geometry.coordinates[1], item.geometry.coordinates[0]], {
          radius: 10,
          color: '#5d9f07',
          fillColor: 'rgba(36,152,5,0.32)',
          fillOpacity: 0.5,
        }).bindPopup('Station '+item.nom).addTo(this.map).on('click', (e: LeafletMouseEvent) => {
          this.map.setView(e.latlng, 16);
          this.stationSelected = item;
        });
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
  }

  /**
   * Permet de mettre à jour la carte et créer un nouveau marker
   * @param result
   */
  private getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  /**
   * Permet de récupérer l'input de l'utilisateur et de lancer la recherche
   */
  refreshSearchList(results: NominatimResponse) {
    this.results = results;
    this.getAddress(results);
    this.citySelected = this.results;
    this.getNearestStation(this.results.latitude, this.results.longitude);
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
   * Récupère la station la plus proche par rapport à la position sur la carte
   * @param lat
   * @param lng
   */
  private getNearestStation(lat: number, lng: number) {
    const station = this.station.reduce((prev, curr) => {
      const prevDist = MapComponent.getDistance(prev.geometry.coordinates[1], prev.geometry.coordinates[0], lat, lng);
      const currDist = MapComponent.getDistance(curr.geometry.coordinates[1], curr.geometry.coordinates[0], lat, lng);
      return prevDist < currDist ? prev : curr;
    });
    this.stationSelected = station.nom
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
    const dLat = MapComponent.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = MapComponent.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(MapComponent.deg2rad(lat1)) * Math.cos(MapComponent.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
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
   * Permet d'initialiser les options de la carte
   * @private
   */
  private initializeMapOptions() {
    this.options = {
      zoom: 8,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM', minZoom: 8})
      ]
    }
  }

  /**
   * Permet d'initialiser la position de départ de la carte
   */
  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Pays de la Loire',
      latitude: 47.478419,
      longitude: -0.563166
    };
  }

  /**
   * Permet de mettre à jour la position de la carte
   * @param latitude
   * @param longitude
   * @param name
   */
  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  /**
   * Permet de créer un marker sur la carte
   */
  private createMarker() {
    this.clearMap();
    const mapIcon = MapComponent.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, 16);
  }

  /**
   * Permet de supprimer tous les marqueurs de la carte
   */
  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
