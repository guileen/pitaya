var msgpack = require('msgpack');

function Response(socket, format){
  this.socket = socket;
  this.format = format;
}

Response.prototype.data = function(obj) {
  var buff, buffsize;
  if(this.format == 'msgpack') {
    var objBuff = msgpack.pack(obj);
    buff = new Buffer(2 + objBuff.length);
    buff.writeUInt16BE(objBuff.length, 0);
    objBuff.copy(buff, 2);
  } else {
    var str = JSON.stringify(obj);
    buffsize = Buffer.byteLength(str);
    buff = new Buffer(buffsize + 2);
    buff.writeUInt16BE(buffsize, 0);
    buff.write(str, 2);
  }
  console.log('RES:', obj);

  this.socket.write(buff);
}

module.exports = Response;
