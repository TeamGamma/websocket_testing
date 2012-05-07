
// Handle a message from a websocket
exports.handleMessage = function(ws, msg) {
  ws.send('You said: ' + msg);
};

