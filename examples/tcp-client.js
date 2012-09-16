var msgpack = require('msgpack');
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 4000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    function send(msg) {
      var buff = msgpack.pack(msg);
      var len = buff.length;
      var buf = new Buffer(len + 2);
      buf.writeUInt16BE(len, 0);
      buff.copy(buf, 2);
      client.write(buf);
    }

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    // client.write('');
    send(['GET', '/', {msg: 'hello'}]);
    send(['GET', '/friends']);
    // send(['GET', '/login', {userid: '1234', password:'1234'}]);
    // send(['GET', '/friends']);
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('Length: ', data.length, 'Data:', data);
    // Close the client socket completely
    console.log(data.toString());
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
