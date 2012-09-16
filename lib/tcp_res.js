var msgpack = require('msgpack');

function Response(socket, format){
  this.socket = socket;
  this.format = format;
}

Response.prototype.data = function(obj) {
  var buff;
  if(this.format == 'msgpack') {
    buff = msgpack.pack(obj);
  } else {
    var str = JSON.stringify(obj);
    buff = new Buffer(str);
  }
  socket.writeUInt16BE(buff.length);
}

module.exports = Response;
