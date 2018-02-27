var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var name = "James";


var clicks = 0;
//function onClick() {
//    clicks += 1;
//    document.getElementById("clicks").innerHTML = clicks;
//    console.log('clicks');
//};


app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    io.emit('message', name + ' joined the room ');

  socket.on('blue', function(msg){
    clicks++;
    io.emit('score', clicks)
    console.log(clicks);
    if(clicks===50){
      clicks=0;
      io.emit('message', "blue wins")
    }
});
  socket.on('red', function(msg){
    clicks--;
    io.emit('score', clicks)
    console.log(clicks);
    if(clicks===-50){
      clicks=0;
      io.emit('message', "red wins")
    }
});

//    io.emit('chat message', name + ' says ' + msg);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
