import {Component, OnInit} from '@angular/core';
import {GeoJSON, Map, MapOptions} from 'leaflet';
import {MapPoint} from "../../../shared/models/map-point.model";
import {NominatimResponse} from "../../../shared/models/nominatim-response.model";
import {MapService} from "../../../shared/services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],

})
export class MapComponent implements OnInit {

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  layer: Array<GeoJSON> = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.initializeCircleStation();
    this.layer = this.mapService.initializeCountyLayer();
    this.mapPoint = this.mapService.initializeDefaultMapPoint();
    this.options = this.mapService.initializeMapOptions();
  }

  /**
   * Permet de récupérer l'input de l'utilisateur et de lancer la recherche
   */
  refreshSearchList(results: NominatimResponse) {
    this.mapService.getAddress(results);
    this.mapService.getNearestStation(results.latitude, results.longitude);
  }

  initializeMap(map: Map) {
    this.mapService.initializeMap(map);
  }

  ngOnDestroy() {
    this.mapService.citySelected.next(null);
    this.mapService.stationSelected.next(null);
  }


}
