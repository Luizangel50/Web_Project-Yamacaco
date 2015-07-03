function server(){

  var app = require('express')();

  //Initialize http server
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var ip = "192.168.0.29"; //write here your ip address
  var port = 4000;

  //Listening http
  http.listen(port, ip, function(){
    console.log('listening at port ' + port);
  });

  //Resquest from app
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/*', function(req, res){
    var file = req.params[0];
    res.sendFile(__dirname + '/' + file);
  });

  // usernames which are currently connected to the chat
  var usernames = {};
  var numUsers = 0;

  io.on('connection', function(socket){

    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function(data){
      // we tell the client to execute 'new message'
      // socket.broadcast.emit('new message', {
      //   username: socket.username,
      //   message: data
      // });
      io.emit('new message', data);
    });

    // // when the client emits 'add user', this listens and executes
    // socket.on('add user', function (username) {
    //   // we store the username in the socket session for this client
    //   socket.username = username;
    //   // add the client's username to the global list
    //   usernames[username] = username;
    //   ++numUsers;
    //   addedUser = true;
    //   socket.emit('login', {
    //     numUsers: numUsers
    //   });
    //   // echo globally (all clients) that a person has connected
    //   socket.broadcast.emit('user joined', {
    //     username: socket.username,
    //     numUsers: numUsers
    //   });
    // });

    // // when the client emits 'typing', we broadcast it to others
    // socket.on('typing', function () {
    //   socket.broadcast.emit('typing', {
    //     username: socket.username
    //   });
    // });

    // // when the client emits 'stop typing', we broadcast it to others
    // socket.on('stop typing', function () {
    //   socket.broadcast.emit('stop typing', {
    //     username: socket.username
    //   });
    // });

    // // when the user disconnects.. perform this
    // socket.on('disconnect', function () {
    //   // remove the username from global usernames list
    //   if (addedUser) {
    //     delete usernames[socket.username];
    //     --numUsers;

    //     // echo globally that this client has left
    //     socket.broadcast.emit('user left', {
    //       username: socket.username,
    //       numUsers: numUsers
    //     });
    //   }
    // });


    //draw socket execution
    socket.on('drawClick', function(data) {
      io.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type,
        color: data.color
      });
    });
  });
}

var server = new server();