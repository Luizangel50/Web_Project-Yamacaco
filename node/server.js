var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/*', function(req, res){
  var file = req.params[0];
  
  res.sendFile(__dirname + '/' + file);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('drawClick', function(data) {
    socket.broadcast.emit('draw', {
      x: data.x,
      y: data.y,
      type: data.type
    });
  });
});


