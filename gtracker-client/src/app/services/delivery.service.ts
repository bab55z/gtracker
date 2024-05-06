import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from './location.service';
import { environment } from '../../environments/environment';

export type DeliveryStatus = "picked-up" | "in-transit" | "delivered" | "failed";
export interface Delivery {
  _id:String|null;
  createdAt:String|null;
  delivery_id:String|null;
  package_id:String|null;
  pickup_time:String|null;
  start_time:String|null;
  end_time:String|null;
  location:Point|null;
  status:String|null;
  package:Object|null;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { 
    console.log('DeliveryService');
  }

  private apiBaseUrl = `http://localhost:${environment.serverPort}/api/delivery`;

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiBaseUrl)
  }

  getDelivery(deliveryId: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiBaseUrl}/${deliveryId}`)
  }

  insertDelivery(parcel: Partial<Delivery>): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiBaseUrl}`, parcel)
  }

  updateDelivery(deliveryId:string, delivery: Delivery): Observable<void> {
    return this.http.put<void>(
        `${this.apiBaseUrl}${deliveryId}`,
        delivery
    )
  }

  deleteDelivery(deliveryId: string) {
    return this.http.delete(`${this.apiBaseUrl}/${deliveryId}`)
  }
}
