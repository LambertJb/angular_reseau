//Appel module !
let server = require('http').createServer()
let io = require('socket.io')(server);

let sockets = [];
let color = 'red';
let text = 'Socket-client works';

// Le Middleware récupère le socket qui se connecte
io.use((req, next) => {
    sockets.push(req);
    next();
});


//Event Connection client on socket
io.on('connection', (client) =>  {

    //Récupération de l'évènement Click, et envoie de la notification pour dire qu'un click vient d'être effectuer chez l'un des clients
    client.on('click',  function (data) {
        color = data;
        this.broadcast.emit('notifServ', color);
    });

    client.on('text', function (data) {
       text = data;
       console.log(text);
       this.broadcast.emit('text', text);
    });

    client.emit('text', text);
    client.emit('notifServ', color);

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
