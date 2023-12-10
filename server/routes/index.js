const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const hdb3Encoder = require('../hdb3/hdb3Encoder');
const hdb3Decoder = require('../hdb3/hdb3Decoder');

const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var jsonParser = bodyParser.json()

router.post('/encode', jsonParser, (req, res) => {
  const binaryData = req.body.message;
  const encodedData = hdb3Encoder.encode(binaryData);
  //sendOverLAN(encodedData[0]);
  const decodedData = hdb3Decoder.decode(encodedData[0]);
  res.json({ encodedData });
});

function sendOverLAN(data) {
    // Use HTTP request or other suitable method to send data over LAN
    // Example: axios.post('http://other-pc-ip:backend-port', { data });

  }

module.exports = router;
