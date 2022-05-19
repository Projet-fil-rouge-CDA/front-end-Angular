import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {SearchAddressService} from "../../../../shared/services/search-address.service";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  @ViewChild('InputSearch') searchInput: any;
  searchInputChanged: Subject<string> = new Subject<string>();

  isSearching = false;
  searchResults: NominatimResponse[] | undefined;

  constructor(private nominatimService: SearchAddressService) {
    this.searchInputChanged.pipe(
      debounceTime(200))
      .subscribe(model => {
        this.addressLookup(model);
      });
  }

  changed(text: string) {
    this.searchInputChanged.next(text);
  }

  addressLookup(address: string) {
    if (address.length > 3) {
      this.isSearching = true;
      this.nominatimService.addressLookup(address).subscribe((data: NominatimResponse[]) => {
        this.searchResults = data;
      });
    } else {
      this.searchResults = [];
    }
  }

  onClickResult(result: NominatimResponse) {
    this.onSearch.emit(result);
    this.isSearching = false;
    this.searchInput.nativeElement.value = result.displayName;
  }
}
