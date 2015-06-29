var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index1.html');
});


app.get('/*', function(req, res){
	var file = req.params[0];

  res.sendFile(__dirname + '/' + file);
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  // socket.on('chat draw', function(draw){
  //   io.emit('chat draw', draw);
  // });
});

http.listen(4000, function(){
  console.log('listening on *:8080');
});