function decode(message) {
  const bitArray = [];

  for (const bit of message) {
    if (bit === "+") {
      bitArray.push(1);
    } else if (bit === "-") {
      bitArray.push(-1);
    } else {
      bitArray.push(0);
    }
  }
  const decodedMessage = [...bitArray];
  let polarity = 0;
  let iterator = 0;

  while (iterator < bitArray.length) {
    if (decodedMessage[iterator] !== 0) {
      if (bitArray[iterator] === polarity) {
        let i = iterator - 3;
        while (i <= iterator) {
          decodedMessage[i] = 0;
          i += 1;
        }
      }

      polarity = decodedMessage[iterator];
    }

    iterator += 1;
  }

  iterator = 0;

  while (iterator < decodedMessage.length) {
    if (decodedMessage[iterator] === -1) {
      decodedMessage[iterator] = 1;
    }

    iterator += 1;
  }

  return decodedMessage;
}

module.exports = {
  decode,
};
