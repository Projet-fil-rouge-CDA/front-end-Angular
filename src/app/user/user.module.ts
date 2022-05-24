import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './likes/list/list.component';
import {AddComponent} from './likes/add/add.component';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';
import {MapComponent} from './home/map/map.component';
import {WeatherComponent} from './home/map/weather/weather.component';
import {StationComponent} from './home/map/station/station.component';
import {UserRoutingModule} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './home/map/search/search.component';
import {SearchAddressService} from "../shared/services/search-address.service";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AddComponent,
    HomeComponent,
    ListComponent,
    SettingsComponent,
    WeatherComponent,
    StationComponent,
    SearchComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    LeafletModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [SearchAddressService,  {provide: LOCALE_ID, useValue: "fr-FR"}]
})
export class UserModule {
}
