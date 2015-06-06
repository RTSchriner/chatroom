var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = 0;

io.on('connection', function (socket) {
    users++;
    socket.broadcast.emit('status', 'A new user has logged in');
    io.sockets.emit('user_count', users);
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
        socket.emit('user_count', users);
    });
    
    socket.on('disconnect', function () {
        users--;
        socket.broadcast.emit('status', 'A user has logged out');
        io.sockets.emit('user_count', users);
    });

    
    
});


server.listen(8080);