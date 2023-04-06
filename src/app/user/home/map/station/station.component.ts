import {Component, OnInit} from '@angular/core';
import {StationService} from "../../../../shared/services/station.service";
import {ActivatedRoute} from "@angular/router";
import {PolluantService} from "../../../../shared/services/polluant.service";
import {DatePipe} from "@angular/common";
import {Polluant} from "../../../../shared/models/polluant";
import {PolluantDTO} from "../../../../shared/models/DTO/polluantDTO";

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
  categoryPolluants: Polluant[] = [];

  constructor(private stationService: StationService, private activatedRoute: ActivatedRoute, private polluantService: PolluantService) {
    this.startDate = new Date(this.endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.stationName = queryParams['stationName'];
      this.stationCode = queryParams['stationCode'];
    });
      this.polluantService.getCategoryPolluant(this.stationCode).subscribe(res => {
          res.point_prelevement.forEach((p: PolluantDTO) => {
              this.categoryPolluants.push({nomPolluant: p.polluant, codePolluant: p.code_polluant});
          });
      });

      this.polluantService.getOnePolluantByStation(parseInt(this.typePolluant), this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
        this.polluant = polluants.content;
      this.totalItems = polluants.totalElements;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  };

  changePage(page: number) {
    this.currentPage = page;
    this.offset = (page - 1);
    this.polluantService.getOnePolluantByStation(parseInt(this.typePolluant), 10, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
        this.polluant = polluants.content;
        this.totalItems = polluants.totalElements;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  onChangePolluant() {
    this.isLoading = true;
    this.polluantService.getOnePolluantByStation(parseInt(this.typePolluant), this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), 'horaire', this.stationCode).subscribe((polluants: any) => {
        this.polluant = polluants.content;
        this.totalItems = polluants.totalElements;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  onChangeMetrique() {
    this.isLoading = true;
      this.polluantService.getOnePolluantByStation(parseInt(this.typePolluant), this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {

          this.polluant = polluants.content;
        this.totalItems = polluants.totalElements;
      this.maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  onChangeDate() {
    this.isLoading = true;
    this.polluantService.getOnePolluantByStation(parseInt(this.typePolluant), this.itemsPerPage, this.offset, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.metrique, this.stationCode).subscribe((polluants: any) => {
        this.polluant = polluants.content;
        this.totalItems = polluants.totalElements;
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

    exportPdf(stationName: string, startDate: Date, endDate: Date) {
        this.stationService.exporterPdf(this.stationCode, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd'), this.typePolluant, this.metrique);
    }
}
