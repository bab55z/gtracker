import { Injectable } from '@angular/core';

export interface Point {
  lat:number;
  lng:number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(){}

  getCurrentLocation(): Promise<Point> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location: Point = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}
