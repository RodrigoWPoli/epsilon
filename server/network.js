const net = require('net');

// Server function
function receiveMessage(port) {
  const server = net.createServer((socket) => {
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    // Event listener for data reception
    socket.on('data', (data) => {
      console.log(`Received message from client: ${data}`);
    });

    // Event listener for connection termination
    socket.on('end', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Client function
function sendMessage(host, port, message) {
  const client = net.createConnection({ host, port }, () => {
    console.log(`Connected to server: ${host}:${port}`);

    // Send a message to the server
    client.write(message);
  });

  // Event listener for data reception
  client.on('data', (data) => {
    console.log(`Received message from server: ${data}`);
    client.end(); // Close the connection after receiving the message
  });

  // Event listener for connection termination
  client.on('end', () => {
    console.log('Disconnected from server');
  });
}

// Exporting functions for use in other modules
module.exports = {
  receiveMessage,
  sendMessage,
};
