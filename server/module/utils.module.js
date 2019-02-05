function notifyAll(arrayOfSocket, data) {
  arrayOfSocket.forEach(function(sock) {
      sock.emit('notifServ', data);
  });
}

function notifyPos(arrayOfSocket, pos) {
    arrayOfSocket.forEach(function(sock) {
        sock.emit('notifPos', pos);
    })
}


exports.notifyPos = notifyPos;
exports.notifyAll = notifyAll;
