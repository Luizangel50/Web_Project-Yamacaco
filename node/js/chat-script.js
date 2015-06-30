var socket = io();
var d = $('#chatArea');
var m = [$('#usernameInput'), $('#inputMessage')];
var n = $('#usernameInput');
// var $usernameDiv = $('<span class="username"/>')
//       .text(m[0].val())
//       .css('color', 'blue');
//     var $messageBodyDiv = $('<span class="messageBody">')
//       .text(m[1].val());
//n.style.fontWeight = bold;
//m[0].val().style.fontWeight = "bold";
// m.InputMessage = $('#inputMessage');
// m.usernameInput = $('#usernameInput');

$('form').submit(function(){
	if (m[1].val() != ""){
	socket.emit('new message', n.val() + " said: " + m[1].val());
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