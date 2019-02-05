import {Component, OnInit} from '@angular/core';
import {SocketClientService} from '../socket-client.service';

@Component({
    selector: 'app-socket-client',
    templateUrl: './socket-client.component.html',
    styleUrls: ['./socket-client.component.css']
})

export class SocketClientComponent implements OnInit {

    item: HTMLElement;
    data: Object;
    dataPos: Object = {
        clientY: 0,
        clientX: 0,
        offsetTop: 0,
        offsetLeft: 0,
    };

    constructor(private socketService: SocketClientService) {
    };

    ngOnInit() {
        this.item = document.getElementById('draggable');

        this.item.addEventListener('click', (event) => {
            if (this.item.style.backgroundColor === "") {
                this.item.style.backgroundColor = 'red';
            } else if (this.item.style.backgroundColor === 'red') {
                this.item.style.backgroundColor = '#323232';
            } else if (this.item.style.backgroundColor === 'rgb(50, 50, 50)') {
                this.item.style.backgroundColor = 'red';
            }
            this.data = {
                backgroundColor: this.item.style.backgroundColor
            };
            this.socketService.sendNotification('click', this.data);
        });


        //<editor-folder desc="Event pour draggable object">
        this.item.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.setDataPos(event);
            this.socketService.sendNotification('mousedown', this.dataPos);
            document.onmousemove = this.onMousemove.bind(this);
            document.onmouseup = this.onMouseup.bind(this);
        });

        //</editor-folder>

        //<editor-folder desc="Attente de notification server pour mettre à jour la position">
        this.socketService.position.subscribe((pos) => {
            this.item.style.left = pos.left + 'px';
            this.item.style.top = pos.top + 'px';
        });
        //</editor-folder>

        this.socketService.click.subscribe((data) => {
            this.item.style.backgroundColor = data.backgroundColor;
        });
    }

    private setDataPos(event) {
        this.dataPos['clientX'] = event.clientX;
        this.dataPos['clientY'] = event.clientY;
        this.dataPos['offsetTop'] = this.item.offsetTop;
        this.dataPos['offsetLeft'] = this.item.offsetLeft;
    }

    onMousemove (e) {
        e = e || window.event;
        e.preventDefault();
        this.setDataPos(e);
        this.socketService.sendNotification('mousemove', this.dataPos);
    }

    onMouseup (event) {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
