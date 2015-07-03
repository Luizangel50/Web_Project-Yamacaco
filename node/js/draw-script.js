function draw(){
  var App;
  App = {};
  
  /*
  	Init 
  */
  App.init = function() {
    App.canvas = document.createElement('canvas');
    App.canvas.setAttribute("id","imageView")
    App.canvas.height = 420;
    App.canvas.width = 1000;
    App.canvas.style.margin = 0;

    document.getElementsByTagName('article')[0].appendChild(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    var ip = "192.168.0.29"; //write here your ip address
    App.socket = io.connect(ip + ':4000');
    
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type, data.color);
    });
    App.draw = function(x, y, type, color) {
      
      App.ctx.strokeStyle = color;
      if (type === "dragstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
  };
  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y, color;
    type = e.handleObj.type;
    color = $('#dtool').find('option:selected').text();
    offset = $(this).offset();
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top+30;
    x = e.offsetX;
    y = e.offsetY;
    
    App.draw(x, y, type, color);
    
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type,
      color: color
    });
  });
  $(function() {
    return App.init();
  });
}

var draw = new draw();