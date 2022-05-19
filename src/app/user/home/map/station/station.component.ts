import {Component, OnInit} from '@angular/core';
import {StationService} from "../../../../shared/services/station.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  constructor(private stationService: StationService) {}

  ngOnInit(): void {};

}
