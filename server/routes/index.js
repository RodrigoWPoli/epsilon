const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
const hdb3Encoder = require('../hdb3/hdb3Encoder');
const hdb3Decoder = require('../hdb3/hdb3Decoder');

var jsonParser = bodyParser.json()

router.post('/encode', jsonParser, (req, res) => {
  const binaryData = req.body.message; 
  console.log(binaryData);
  const encodedData = hdb3Encoder.encode(binaryData);
  sendOverLAN(encodedData);
    
  const decodedData = hdb3Decoder.decode(encodedData);
  console.log(decodedData)
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
    console.log(data)
  }

module.exports = router;
