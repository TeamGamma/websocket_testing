var WebSocket = require('faye-websocket'),
    http      = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
  if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }
});

server.on('upgrade', function(request, socket, head) {
  var ws = new WebSocket(request, socket, head);

  ws.onopen = function(event) {
    console.log('open');
  };

  ws.onmessage = function(event) {
    console.log('Received: "' + event.data + '"');

    ws.send('timer started');
    setTimeout(function() {
      ws.send('timer finished');
      ws.close();
    }, 5000);
  };

  ws.onclose = function(event) {
    console.log('close', event.code, event.reason);
    ws = null;
  };
});

server.listen(9001);
