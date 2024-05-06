import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Delivery } from './delivery.service';
import { environment } from '../../environments/environment';

export interface Package {
    _id:String|null;
    createdAt:String|null;
    package_id:String|null;
    active_delivery_id:String|null;
    active_delivery:Partial<Delivery>|null;
    description :String|null;
    weight :Number|null;
    width :Number|null;
    height :Number|null;
    depth :Number|null;
    from_name :String|null;
    from_address :String|null;
    from_location :Object|null;
    to_name :String|null;
    to_address :String|null;
    to_location :Object|null;
    deliveries:any[]|null;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient) {
    console.log('PackageService')
  }

  private apiBaseUrl = `http://localhost:${environment.serverPort}/api/package`;

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiBaseUrl)
  }

  getPackage(packageId: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiBaseUrl}/${packageId}`)
  }

  insertPackage(parcel: Partial<Package>): Observable<Package> {
    return this.http.post<Package>(`${this.apiBaseUrl}`, parcel)
  }

  updatePackage(parcel: Package): Observable<void> {
    return this.http.put<void>(
        `${this.apiBaseUrl}${parcel.package_id}`,
      parcel
    )
  }

  deletePackage(packageId: string) {
    return this.http.delete(`${this.apiBaseUrl}/${packageId}`)
  }

  getIdsSuggestion(inputValue: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBaseUrl}/suggestions?input=${inputValue}`)
  }
}