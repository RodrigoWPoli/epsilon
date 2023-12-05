function decode(encodedData) {
    const hbd3Dict = {
        '000V': '0000',
        '001B': '0001',
        '001V': '0010',
        '010B': '0011',
        '010V': '0100',
        '011B': '0101',
        '011V': '0110',
        '100B': '0111',
        '100V': '1000',
        '101B': '1001',
        '101V': '1010',
        '110B': '1011',
        '110V': '1100',
        '111B': '1101',
        '111V': '1110',
        '000B': '1111'
    };

    let decodedData = '';
    for (let i = 0; i < encodedData.length; i += 4) {
        const chunk = encodedData.substring(i, i + 4);
        decodedData += hbd3Dict[chunk];
    }

    // Remove padding zeros from the left
    decodedData = decodedData.replace(/^0+/, '');

    return decodedData;
}

module.exports = {
    decode,
  };