import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NominatimResponse} from "../../../../shared/models/nominatim-response.model";
import {SearchAddressService} from "../../../../shared/services/search-address.service";
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  @ViewChild('InputSearch') searchInput: any;
  isSearching = false;
  searchResults: NominatimResponse[] | undefined;
  searchInputChanged: Subject<string> = new Subject<string>();
  searchSub = new Subscription();

  constructor(private nominatimService: SearchAddressService) {
    this.searchInputChanged.pipe(
      debounceTime(500))
      .subscribe(model => {
        this.addressLookup(model);
      });
  }

  ngOnInit(): void {
  }

  changed(text: string) {
    this.searchInputChanged.next(text);
  }

  addressLookup(address: string) {
    if (address.length > 2) {
      this.isSearching = true;
      this.searchSub = this.nominatimService.addressLookup(address).subscribe(
        (data: NominatimResponse[]) => {
          this.searchResults = data;
          this.searchSub.unsubscribe();
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

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
