$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var stat_log = $('.status-log');
    var user_count = $('.user-count');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    
    socket.on('message', addMessage);
    
    socket.on('status', function(text){
        stat_log.append('<div>' + text + '</div>');
    });
    
    socket.on('user_count', function(count) {
        user_count.html(count);
    });

    
});
