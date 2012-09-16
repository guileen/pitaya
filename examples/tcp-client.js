var net = require('net');

var HOST = '127.0.0.1';
var PORT = 4000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
	var str = JSON.stringify({msg: 'hello'});
	var len = Buffer.byteLength(str);
	var buf = new Buffer(len + 2);
	buf.writeUInt16BE(len, 0);
	buf.write(str, 2);
	client.write(buf);
	// client.write('');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

	console.log('DATA: ' + data);
	// Close the client socket completely
	client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
	console.log('Connection closed');
});