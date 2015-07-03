var socket = io();

function chat(){
  var d = $('#chatArea');
  var m = [$('#usernameInput'), $('#inputMessage')];

  $('form').submit(function(){
    if (m[1].val() != ""){
    socket.emit('new message', m[0].val() + " said: " + m[1].val());
    }
      else{
        socket.emit('new message', "");
        }
      m[1].val('');
      return false;
  });

  socket.on('new message', function(data){
    if(data != ""){
      $('#chatArea').append($('<li>').append(data));
      d.scrollTop(d[0].scrollHeight);
    }
  });
}

var chat = new chat();