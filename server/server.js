var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('../public'));

console.log('Server live')

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){ 
    console.log("New connection: " + socket.id);

    socket.on('coordinates', coordsMsg)

    function coordsMsg(data) {
        socket.broadcast.emit('coordinates', data)
        console.log(data)
    }
}