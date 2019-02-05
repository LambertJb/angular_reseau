//Appel module !
let server = require('http').createServer()
let io = require('socket.io')(server);
let utils = require('./module/utils.module');

let sockets = [];
let dragClient = {};
let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

let pos = {
    top: 0,
    left: 0
};

let color = [];

// Le Middleware récupère le socket qui se connecte
io.use((req, next) => {
    sockets.push(req);
    next();
});


//Event Connection client on socket
io.on('connection', function (client) {

    //Récupération de l'évènement Click, et envoie de la notification pour dire qu'un click vient d'être effectuer chez l'un des clients
    client.on('click', function (data) {
        color = data;
        utils.notifyAll(sockets, data);
    });

    this.emit('notifServ', color);
    this.emit('notifPos', pos);

    //<editor-folder desc=Événement de gestion du déplacement de l'item>
    client.on('mousedown', function (data) {
        dragClient = this;

        pos3 = data.clientX;
        pos4 = data.clientY;
    });

    client.on('mousemove', function (data) {
        if (Object.is(dragClient, this)) {
            pos1 = pos3 - data.clientX;
            pos2 = pos4 - data.clientY;
            pos3 = data.clientX;
            pos4 = data.clientY;

            pos.top = data.offsetTop - pos2;
            pos.left = data.offsetLeft - pos1;

            utils.notifyPos(sockets, pos);
        }
    });
    //</editor-folder>

    //Événement de déconnexion, retire la socket client des notifications.
    client.on('disconnect', function () {
        console.log('Client disconnected');
        sockets = sockets.filter((item) => {
            if (!Object.is(item, this)) {
                return item;
            }
        })
    })
});

//Server Listener
server.listen(3000);
