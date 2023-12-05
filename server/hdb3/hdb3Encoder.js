function encode(data) {
  const hbd3Dict = {
    "0000": "000V",
    "0001": "001B",
    "0010": "001V",
    "0011": "010B",
    "0100": "010V",
    "0101": "011B",
    "0110": "011V",
    "0111": "100B",
    1000: "100V",
    1001: "101B",
    1010: "101V",
    1011: "110B",
    1100: "110V",
    1101: "111B",
    1110: "111V",
    1111: "000B",
  };

  let encodedData = "";

  data.forEach((binary) => {
    const paddedBinary = padBinary(binary);
    for (let i = 0; i < paddedBinary.length; i += 4) {
      const chunk = paddedBinary.substring(i, i + 4);
      encodedData += hbd3Dict[chunk];
    }
  });

  return encodedData;
}

module.exports = {
  encode,
};
