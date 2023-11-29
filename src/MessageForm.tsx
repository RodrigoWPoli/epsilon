import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const secretKey = 'your-secret-key'; // Replace with a secure method for key exchange

  const handleMessageChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(e.target.value);
  };

  const encryptMessage = (text: string) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
  };

  const decryptMessage = (encryptedText: any) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  const handleSendMessage = () => {
    const encryptedMessage = encryptMessage(message);

    

    // Simulate receiving the encrypted message on the other end
    const decryptedMessage = decryptMessage(encryptedMessage);

    setEncryptedMessage(encryptedMessage);
    setDisplayedMessage(decryptedMessage);
    setMessage('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>
        <div style={{ margin: '20px auto' }}>Messenger</div>
        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={handleMessageChange}
          style={{ padding: '10px', justifyContent: 'center' }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
      <div style={{ margin: '20px auto' }}>Encrypted message:</div>
      <div style={{ margin: '20px auto', border: '2px solid #ddd', padding: '10px', height: '200px', maxWidth: '400px', wordWrap: 'break-word' }}>
        {encryptedMessage && <p>{encryptedMessage}</p>}
      </div>
      <div style={{ margin: '20px auto' }}>Message received:</div>
      <div style={{ margin: '20px auto', border: '2px solid #ddd', padding: '10px', height: '200px', maxWidth: '400px', wordWrap: 'break-word' }}>
        {displayedMessage && <p>{displayedMessage}</p>}
      </div>
    </div>
  );
};

export default MessageForm;