const http = require('http');

function receiveMessage(port, callback) {
  const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        console.log(`Received message from client: ${data}`);
        callback(data);
        res.end('Message received successfully');
      });
      server.close(() => {
        console.log(`Server stopped listening on port ${port}`);
      });
    } else {
      res.end('Invalid request');
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });

  return server;
}

function sendMessage(message) {
   const host = "172.22.117.39";
  const port = "7878"
  const options = {
    hostname: host,
    port: port,
    path: '/send-message',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(message),
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Received response from server: ${data}`);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error.message);
  });

  req.write(message);
  req.end();
}

module.exports = {
  receiveMessage,
  sendMessage,
};
