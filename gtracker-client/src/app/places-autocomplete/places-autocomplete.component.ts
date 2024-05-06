import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'address-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './places-autocomplete.component.html',
  styleUrl: './places-autocomplete.component.scss'
})
export class PlacesAutocompleteComponent {
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  autocomplete: any;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement);
    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          // Get latitude and longitude
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          // You can store lat and lng in variables here
        }
      });
    });
  }

}
