const net = require('net');

function receiveMessage(port, callback) {
  const server = net.createServer((socket) => {
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on('data', (data) => {
      console.log(`Received message from client: ${data}`);
      callback(data.toString());
      server.close();
    });
    socket.on('end', () => {
      console.log('Client disconnected');
    });
  });
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  return server;
}

function sendMessage(host, port, message) {
  const client = net.createConnection({host, port}, () => {
    client.write(message);
  });
}

module.exports = {
  receiveMessage,
  sendMessage,
};
