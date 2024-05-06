import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;
  private apiBaseUrl = `http://localhost:${environment.serverPort}`;

  constructor(private http: HttpClient) { 
    this.socket = io(this.apiBaseUrl);
  }

  joinTracker(trackerId: string): void {
    this.socket.emit('subscribe', trackerId);
  }

  initTracker(packageId:string): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/api/tracker/initiate`, {packageId})
  }

  emitEvent(event: string, payload:any): void {
    this.socket.emit(event, payload);
  }

  listenToTracker(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  listenToAny(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.onAny((eventName:any, ...args:any) => {
        console.log({"eny event catcher":args});
        subscriber.next(args);
      });
    });
  }

}
