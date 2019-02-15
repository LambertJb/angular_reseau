import {Injectable, EventEmitter} from '@angular/core';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})

export class SocketClientService {

    click: EventEmitter<any> = new EventEmitter();
    text: EventEmitter<any> = new EventEmitter();
    socket = io('dev.reseau.jblambert.ovh:3000');

    constructor() {
        this.socket.on('notifServ', (data) => {
            this.click.emit(data);
        });

        this.socket.on('text', (text) => {
            this.text.emit(text);
        })
    }

    changeColor(color: string): string {
        color = color === 'red' ? 'black' : 'red';
        this.socket.emit('click', color);
        return color;
    }

    changeText(text: string): void {
        text = text.trim();
        if (!text) { return; }
        this.socket.emit('text', text);
    }
}
