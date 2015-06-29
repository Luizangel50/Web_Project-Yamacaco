var socket = io();
var d = $('#messages');     

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  if(msg != ""){
    $('#messages').append($('<li>').text(msg));
    d.scrollTop(d[0].scrollHeight);
  }
});