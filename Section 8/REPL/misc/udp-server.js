/*
 * Example UDP Server
 * Creating a UDP datagram server and listening on 6000
 *
 */

// Dependencies
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message',function(messageBuffer,sender){
  // Do something with an incoming message or the sender
  var messageString = messageBuffer.toString();
  console.log(messageString);
});

// Bind to 6000
server.bind(6000);
