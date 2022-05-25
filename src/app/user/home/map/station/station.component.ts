import {Component, OnInit} from '@angular/core';
import {StationService} from "../../../../shared/services/station.service";
import {ActivatedRoute} from "@angular/router";
import {PolluantService} from "../../../../shared/services/polluant.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-station', templateUrl: './station.component.html', styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  stationName: string;
  stationCode: string;
  polluant: any;
  offset: number = 0;
  totalItems: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  maxPage: number;
  listPolluants = [{
    "polluant_name": "O3", "polluant": "08"
  }, {
    "polluant_name": "SO2", "polluant": "01"
  }, {
    "polluant_name": "NO2", "polluant": "03"
  }, {
    "polluant_name": "PM10", "polluant": "24"
  }, {
    "polluant_name": "PM25", "polluant": "39"
  }];
  typePolluant = this.listPolluants[3].polluant;
  metrique = "horaire";
  endDate = new Date();
  startDate = new Date();
  datePipe = new DatePipe('en-US');
  isLoading: boolean = true;

  constructor(private stationService: StationService, private activatedRoute: ActivatedRoute, private polluantService: PolluantService) {
    this.startDate.setMonth(this.startDate.getMonth() - 1, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.stationName = queryParams['stationName'];
      this.stationCode = queryParams['stationCode'];
    });
    this.polluantService.getAllPolluants(parseInt(this.typePolluant), this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
      this.polluant = polluants.results;
      this.totalItems = polluants.count;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  };

  changePage(page: number) {
    this.currentPage = page;
    this.offset = (page - 1) * 10;
    this.polluantService.getAllPolluants(this.typePolluant, 10, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
      this.polluant = polluants.results;
      this.totalItems = polluants.count;
      console.log(this.totalItems);
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  onChangePolluant() {
    this.isLoading = true;
    this.polluantService.getAllPolluants(this.typePolluant, this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), 'horaire', this.stationCode).subscribe((polluants: any) => {
      this.polluant = polluants.results;
      this.totalItems = polluants.count;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  onChangeMetrique() {
    this.isLoading = true;
    this.polluantService.getAllPolluants(this.typePolluant, this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
      this.polluant = polluants.results;
      this.totalItems = polluants.count;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  onChangeDate() {
    this.isLoading = true;
    this.polluantService.getAllPolluants(this.typePolluant, this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
      this.polluant = polluants.results;
      this.totalItems = polluants.count;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  transformCodeToName(code: string) {
    switch (code) {
      case '01':
        return 'SO2';
      case '03':
        return 'NO2';
      case '24':
        return 'PM10';
      case '39':
        return 'PM25';
      case '08':
        return 'O3';
      default:
        return 'N/A';
    }
  }

  ngOnDestroy(): void {
    this.polluant = null;
  }

}
