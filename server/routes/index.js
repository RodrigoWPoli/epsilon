const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const hdb3Encoder = require('../hdb3/hdb3Encoder');
const hdb3Decoder = require('../hdb3/hdb3Decoder');
const network = require('../network');

var jsonParser = bodyParser.json()

router.post('/send', jsonParser, (req, res) => {
  const binaryData = req.body.message;
  const encodedData = hdb3Encoder.encode(binaryData);
  sendMessage(encodedData[0]);
  res.json({ encodedData });
});

router.get('/receive', async (req, res) => {
  const port = "7878"
  network.receiveMessage(port, (receivedData) => {
    const decodedData = hdb3Decoder.decode(receivedData);
    res.json({ receivedData, decodedData });
  });
});

function sendMessage(data) {
  network.sendMessage(data);
}

module.exports = router;
