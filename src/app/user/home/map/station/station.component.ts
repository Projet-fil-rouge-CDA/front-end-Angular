import {Component, OnInit} from '@angular/core';
import {StationService} from "../../../../shared/services/station.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  stationName: string;
  constructor(private stationService: StationService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // stationName = queryParams
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.stationName = queryParams['stationName'];
    });
  };

}
