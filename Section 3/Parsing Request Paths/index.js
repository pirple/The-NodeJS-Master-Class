/*
 * Primary file for API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');

 // Configure the server to respond to all requests with a string
var server = http.createServer(function(req,res){

  // Parse the url
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Send the response
  res.end('Hello World!\n');

  // Log the request/response
  console.log('Request received on path: '+trimmedPath);
});

// Start the server
server.listen(3000,function(){
  console.log('The server is up and running now');
});
