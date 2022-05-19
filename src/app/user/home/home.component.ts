import { Component, OnInit } from '@angular/core';
import {NominatimResponse} from "../../shared/models/nominatim-response.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  city: NominatimResponse;
  constructor() { }

  ngOnInit(): void {
  }

  onCityChange(city: NominatimResponse) {
    console.log(city);
    this.city = city;
  }

}
