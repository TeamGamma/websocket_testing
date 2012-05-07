var WebSocket = require('faye-websocket');
var http = require('http');
var fs = require('fs');

var server = http.createServer();

// Handle special WebSocket request
server.on('upgrade', function(request, socket, head) {

  // Initialize a new WebSocket connection using the HTTP connection
  var ws = new WebSocket(request, socket, head);

  ws.onopen = function(event) {
    ws.send('Welcome!');
    console.log('WebSocket connection opened');
  };

  ws.onmessage = function(event) {
    console.log('WebSocket received: "' + event.data + '"');
    var msg = event.data;

    ws.send('You said "' + msg + '"');
  };

  ws.onclose = function(event) {
    console.log('WebSocket connection closed: ', event.code, event.reason);
  };
});

// Handle ordinary HTTP request
server.on('request', function(request, response) {
  if(request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});

    // Serve index.html
    fs.readFile('./index.html', 'utf-8', function (err, file) {
      response.end(file, 'utf-8');
    });

  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found');
  }
});

server.listen(9001);
console.log('Server running on http://localhost:9001');

