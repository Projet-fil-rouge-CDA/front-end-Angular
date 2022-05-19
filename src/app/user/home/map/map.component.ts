import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';
import {MapPoint} from "../../../shared/models/map-point.model";
import {NominatimResponse} from "../../../shared/models/nominatim-response.model";

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
  @Output() citySelected = new EventEmitter();
  results: NominatimResponse;

  constructor () {
  }

  ngOnInit () {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap (map: Map) {
    this.map = map;
    this.createMarker();
  }

  getAddress (result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList (results: NominatimResponse) {
    this.results = results;
    this.getAddress(results);
    this.citySelected.emit(this.results);
  }

  private initializeMapOptions () {
    this.options = {
      zoom: 18,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM'})
      ]
    }
  }

  private initializeDefaultMapPoint () {
    this.mapPoint = {
      name: 'Pays de la Loire',
      latitude: 47.7632836,
      longitude: -0.3299687
    };
  }

  onMapClick (e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint (latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker () {
    this.clearMap();
    const mapIcon = MapComponent.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private static getDefaultIcon () {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap () {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
