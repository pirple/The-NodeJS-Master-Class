/*
 * Example HTTP2 client
 * Connects to port 6000 and logs the response
 *
 */

// Dependencies
var http2 = require('http2');

// Create client
var client = http2.connect('http://localhost:6000');

// Create a request
var req = client.request({
  ':path': '/'
});

// When message is received, add the pieces of it together until you reach the end
var str = '';
req.on('data',function(chunk){
  str += chunk;
});

// When a message ends, log it out
req.on('end', function(){
  console.log(str);
});

// End the request
req.end();
