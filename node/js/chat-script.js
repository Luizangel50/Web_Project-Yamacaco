var socket = io();
var d = $('#chatArea');     
var m_ImputMessage = $('#inputMessage');
var m_usernameImput = $('#usernameInput');

$('form').submit(function(){
  socket.emit('new message', m_usernameImput.val() + " said: " + m_ImputMessage.val());
  m_ImputMessage.val('');
  return false;
});

socket.on('new message', function(data){
  if(data != ""){
    $('#chatArea').append($('<li>').text(data));
    d.scrollTop(d[0].scrollHeight);
  }
});