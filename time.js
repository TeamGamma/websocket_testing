
// Handle a message from a websocket
exports.handleMessage = function(ws, msg) {
  ws.send('10:00PM, May 6, 2012');
};

