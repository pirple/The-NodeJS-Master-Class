/*
 * Example HTTP2 Server
 * Opening a full-duplex (stream) channel on port 6000
 *
 */

// Dependencies
var http2 = require('http2');

// Init the server
var server = http2.createServer();

// On a stream, send back hello world html
server.on('stream', function(stream,headers){
  stream.respond({
    ':status': 200,
    'content-type': 'text/html'
  });
  stream.end('<html><body><p>Hello World</p></body></html>');
});

// Listen on 6000
server.listen(6000);
