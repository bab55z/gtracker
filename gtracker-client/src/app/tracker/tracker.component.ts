import { Component, Input, computed, signal } from '@angular/core';
import { Package, PackageService } from '../services/package.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Delivery, DeliveryService, DeliveryStatus } from '../services/delivery.service';
import * as L from 'leaflet';
import { WebsocketService } from '../services/webocket.service';
import { LocationService } from '../services/location.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
})
export class TrackerComponent {
  map: any; 
  markers: L.Marker[] = [];
  subscription: Subscription | null = null;
  package: Partial<Package>|null = null;
  @Input() forDriver: boolean = false;

  constructor(
    private packageService: PackageService, 
    private deliveryService: DeliveryService,
    private websocketService: WebsocketService,
    private location: LocationService
  ){}
  searchForm = new FormGroup({
    package_id : new FormControl<string>('',[Validators.required, Validators.minLength(5)], ),
  });

  onSubmit() {
    this.packageService.getPackage(this.searchForm.value.package_id! )
    .subscribe((data:any) => {
      this.package = data;

      const pos:any = data.active_delivery? data.active_delivery.location : data.from_location;

      if(!this.map){
        this.initMap(pos?.lat, pos.lng);
      }
      else{
        this.map.setView([pos?.lat, pos.lng]);
      }

      this.rerenderMarkers(this.package);

      const packageId = data._id + '';
      // subscript to status update if active delivery
      if(data.active_delivery){

        // driver: send location updates every 20 seconds
        if(this.forDriver){
          this.subscription = interval(20000)
            .subscribe(async() => {
            await this.emitLocationUpdate(data.active_delivery._id);
          });
        }
        else{
         // web tracker : follow update only
         this.websocketService.listenToTracker("delivery_updated").subscribe((data) => {
          console.log('tracker update:', data);
          // update markers
          this.rerenderMarkers(this.package,data.delivery.location);

          // update active delivery
          if(this.package){
            this.package.deliveries = this.package.deliveries?.map(delivery => delivery._id === data.delivery._id ? data.delivery : delivery);
            this.package.active_delivery = data.delivery;
          }
        });
        }
      }
    });
  }

  async emitLocationUpdate(delivery_id:string) {
    if(!this.forDriver || !this.package?.active_delivery){
      return;
    }
    console.log('emitting location update...');
    const location = await this.location.getCurrentLocation();
    console.log({location})
    // rerender markers 
    this.removeMarkers();
    this.rerenderMarkers(this.package, location);

    this.websocketService.emitEvent("location_changed",{event:"location_changed", delivery_id, location});
  }

  rerenderMarkers(parcel:any, currentLocation:any = null){
    this.removeMarkers();
     // from location marker 
    this.addMarker(parcel?.from_location?.lat, parcel?.from_location?.lng, "Source");
    // to location marker 
    this.addMarker(parcel?.to_location?.lat, parcel?.to_location?.lng, "Destination");
   if(currentLocation){
      this.addMarker(currentLocation.lat, currentLocation.lng, "Current location");
      this.map.setView([currentLocation.lat, currentLocation.lng]);
    }
  }
  
  async updatePackageStatus(status: DeliveryStatus){
    // check if a package has been loaded
    if(!this.package){
      console.log("No package is being tracked, cannot update the status");
      return;
    }

    // emit status change
    const delivery_id = this?.package?.active_delivery?._id
    this.websocketService.emitEvent("status_changed",{event:"status_changed", delivery_id, status});
    if(this.package && this.package.active_delivery){
      this.package.active_delivery.status = status;
    }
  }

  currentStatus(): string{
    if(!this.package || !this.package.active_delivery){
      return '';
    }
    return this.package.active_delivery.status + '';
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  initMap(lat = 51.505, lng = -0.09, zoom = 13 ): void {
    if(this.package){
      this.map = L.map('leafletMap').setView([lat, lng], zoom);
      L.Icon.Default.imagePath = 'assets/';
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);  
    }
  }

  addMarker(lat: number, lng: number, title=""): void {
    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup(title).openPopup();
    this.markers.push(marker);
  }

  removeMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }
}
