import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
  getPredictionUpdates(): Observable<any> {
    return this.socket.fromEvent('new_prediction');
  }
}
