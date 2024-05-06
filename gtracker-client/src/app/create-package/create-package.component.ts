import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PackageService } from '../services/package.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesAutocompleteComponent } from '../places-autocomplete/places-autocomplete.component';
import {Router} from '@angular/router';
import { LocationService, Point } from '../services/location.service';

@Component({
  selector: 'app-create-package',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, PlacesAutocompleteComponent],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.scss'
})
export class CreatePackageComponent {
  constructor(
    private packageService: PackageService, 
    private router: Router,
    private location: LocationService
  ){}

  packageForm = new FormGroup({
    description : new FormControl<string>('',[Validators.required], ),
    weight : new FormControl<number|null>(null,[Validators.required]),
    width : new FormControl<number|null>(null,[Validators.required]),
    height : new FormControl<number|null>(null,[Validators.required]),
    depth : new FormControl<number|null>(null,[Validators.required]),
    from_name : new FormControl('',[Validators.required]),
    from_address : new FormControl('',[Validators.required]),
    to_name : new FormControl('',[Validators.required]),
    to_address : new FormControl('',[Validators.required]),
  });

  async onSubmit() {
    const currentLocation = await this.location.getCurrentLocation();
    const randomDistance = Math.floor(Math.random() * (150 - 10 + 1)) + 10;
    this.packageService.insertPackage({
      ...this.packageForm.value,
      from_location: {lat:currentLocation.lat.toString(), lng:currentLocation.lng.toString()},     
      to_location:this.randomPoint(currentLocation, randomDistance),
    })
    .subscribe(data => {
      this.router.navigate(['/admin']);
      console.log({data});
    });
  }

  randomPoint(defaultPoint: Point = {lat:9.3077,lng:2.3158}, radius: number = 300) {
    // Radius conversion to degrees (1 degree is approximately 111 kilometers)
    const radiusInDegrees = radius / 111;

    // Generate random offsets within the radius
    const randomLatitudeOffset = Math.random() * radiusInDegrees;
    const randomLongitudeOffset = Math.random() * radiusInDegrees;

    // Determine random latitude and longitude within the radius
    const randomLatitude = defaultPoint.lat + (Math.random() < 0.5 ? -1 : 1) * randomLatitudeOffset;
    const randomLongitude = defaultPoint.lng + (Math.random() < 0.5 ? -1 : 1) * randomLongitudeOffset;

    return { lat: randomLatitude, lng: randomLongitude };
 }
}
