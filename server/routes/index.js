const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const hdb3Encoder = require('../hdb3/hdb3Encoder');
const hdb3Decoder = require('../hdb3/hdb3Decoder');

const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var jsonParser = bodyParser.json()

router.post('/encode', jsonParser, (req, res) => {
  const binaryData = req.body.message;
  const encodedData = hdb3Encoder.encode(binaryData);
  sendOverLAN(encodedData[0]);
  //const decodedData = hdb3Decoder.decode(encodedData[0]);
  console.log(binaryData)
  //console.log(decodedData)
  res.json({ encodedData });
});

router.post('/decode', (req, res) => {
  const hdb3Data = req.body.data; // Assuming HDB3-encoded data is sent in the request body
  const decodedData = hdb3Decoder.decode(hdb3Data);
  res.json({ decodedData });
});

function sendOverLAN(data) {
    // Use HTTP request or other suitable method to send data over LAN
    // Example: axios.post('http://other-pc-ip:backend-port', { data });

    wss.on('connection', (ws) => {
      console.log('Client connected');
  
      // Listen for messages from clients
      ws.on('message', (message) => {
          console.log(`Received message: ${message}`);
  
          // You can process the message or send a response back to the client
          // For example, you can broadcast the message to all connected clients:
          wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(message);
              }
          });
      });
  
      // Close connection
      ws.on('close', () => {
          console.log('Client disconnected');
      });
  });
  }

module.exports = router;
