import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './likes/list/list.component';
import { AddComponent } from './likes/add/add.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './home/map/map.component';
import { WeatherComponent } from './home/map/weather/weather.component';
import { StationComponent } from './home/map/station/station.component';
import {UserRoutingModule} from "./user-routing.module";
import { SearchComponent } from './home/map/search/search.component';
import {SearchAddressService} from "../shared/services/search-address.service";
import {FormsModule} from "@angular/forms";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ListComponent,
    AddComponent,
    SettingsComponent,
    HomeComponent,
    WeatherComponent,
    StationComponent,
    SearchComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    LeafletModule
  ],
  providers: [SearchAddressService]
})
export class UserModule { }
