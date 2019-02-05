import { Injectable, EventEmitter } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketClientService {

  click: EventEmitter<any> = new EventEmitter();
  position: EventEmitter<any> = new EventEmitter();
  socket = io('dev.reseau.jblambert.ovh:3000');

  constructor() {
    this.socket.on('notifServ', (data) => {
        this.click.emit(data);
    });

    this.socket.on('notifPos', (pos) => {
        this.position.emit(pos);
    })
  }

  sendNotification(nameEvent, jsonData) {
    this.socket.emit(nameEvent, jsonData);
  }

}
