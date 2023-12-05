function AMIencoding(binaryMessage) {
    let amiMessage = binaryMessage.split('').map(Number); // Convert binary string to array of numbers
    let polarity = 1;

    for (let i = 0; i < amiMessage.length; i++) {
        if (amiMessage[i] === 1) {
            amiMessage[i] = polarity;
            polarity *= -1;
        }
    }

    return amiMessage;
}

function encode(message) {
    const amiMessage = AMIencoding(message.slice());
    let hdb3Message = [...amiMessage];

    let zerosCounter = 0;
    let polarity = 0;
    let iterator = 0;

    for (const bit of amiMessage) {
        if (bit === 0) {
            zerosCounter += 1;

            if (zerosCounter === 4) {
                zerosCounter = 0;
                if (iterator === 3) {
                    hdb3Message[iterator] = -1; // Preventing segFault
                } else {
                    hdb3Message[iterator] = hdb3Message[iterator - 4];
                }

                if (hdb3Message[iterator] === polarity) {
                    hdb3Message[iterator] = hdb3Message[iterator] * -1;
                    hdb3Message[iterator - 3] = hdb3Message[iterator];
                    let i = iterator + 1;
                    while (i < hdb3Message.length) {
                        hdb3Message[i] = hdb3Message[i] * -1;
                        i += 1;
                    }
                }

                polarity = hdb3Message[iterator];
            }
        } else {
            zerosCounter = 0;
        }

        iterator += 1;
    }

    const stringArray = hdb3Message.map((bit) => {
        if (bit === 1) {
            return '+';
        } else if (bit === -1) {
            return '-';
        } else {
            return '0';
        }
    });

    return [stringArray.join(''), hdb3Message];
}

module.exports = {
  encode,
};
