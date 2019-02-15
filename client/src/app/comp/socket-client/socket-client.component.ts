import {Component, OnInit} from '@angular/core';
import {SocketClientService} from '../../service/socket-client.service';

@Component({
    selector: 'app-socket-client',
    templateUrl: './socket-client.component.html',
    styleUrls: ['./socket-client.component.css']
})

export class SocketClientComponent implements OnInit {
    color: string;
    text: string;

    constructor(private socketService: SocketClientService) {
    };

    ngOnInit() {
        this.socketService.click.subscribe((data) => {
            this.color = data;
        });

        this.socketService.text.subscribe((data) => {
            this.text = data;
        });
    }

    changeColor() {
        this.color = this.socketService.changeColor(this.color);
    }

    changeText(text: string) {
        this.text = text;
        this.socketService.changeText(text);
    }
}
