import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const MessageForm = () => {
  const [backendData, setBackendData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // Set up an interval to fetch data every, for example, 5000 milliseconds (5 seconds)
    const intervalId = setInterval(fetchData, 3000);

    // Clean up the interval when the component unmounts or when you want to stop fetching
    return () => clearInterval(intervalId);
  }, []);

  const [message, setMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [binaryMessage, setBinaryMessage] = useState("");
  const secretKey = "your-secret-key"; // Replace with a secure method for key exchange

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const encryptMessage = (text) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
  };

  const decryptMessage = (encryptedText) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return decrypted;
  };
  const binariseMessage = (text) => {
    const textEncoder = new TextEncoder();
    const arrayBuffer = textEncoder.encode(text);
    return Array.from(new Uint8Array(arrayBuffer));
  };
  const deBinarizeMessage = (binaryArray) => {
  const uint8Array = new Uint8Array(binaryArray);
  const textDecoder = new TextDecoder();
  return textDecoder.decode(uint8Array);
  };

  const sendMessage = async (message) => {
    const uint8Array = new Uint8Array(binaryMessage);
    const blob = new Blob([uint8Array]);
    const formData = new FormData();
    formData.append('binaryMessage', blob, 'binaryMessage');

  try {
    // Send the binary message to the backend
    const response = await fetch("/api/sendBinaryMessage", {
      method: "POST",
      body: formData,
    });

    // Handle the response from the backend as needed
    const data = await response.json();
    console.log('Response from backend:', data);
  } catch (error) {
    console.error("Error sending binary message:", error);
  }

  };

  const handleSendMessage = () => {
    const encryptedMessage = encryptMessage(message);
    const binaryMessage = binariseMessage(encryptedMessage);
    //send to backend
    sendMessage(binaryMessage);


    //receive from backend
    const deBinarizedMessage = deBinarizeMessage(binaryMessage);
    const decryptedMessage = decryptMessage(deBinarizedMessage);
    setEncryptedMessage(encryptedMessage);
    setBinaryMessage(binaryMessage);
    setDisplayedMessage(decryptedMessage);
    setMessage("");
  };
  const styles = {
    messageContainer: {
      margin: "20px auto",
      border: "2px solid #ddd",
      padding: "10px",
      height: "200px",
      maxWidth: "400px",
      wordWrap: "break-word",
    },
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <div style={{ margin: "20px auto" }}>backendData</div>
        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={handleMessageChange}
          style={{ padding: "10px", justifyContent: "center" }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
      <div style={{ margin: "20px auto" }}>Encrypted message:</div>
      <div style={styles.messageContainer}>{encryptedMessage}</div>
      <div style={{ margin: "20px auto" }}>binary message:</div>
      <div style={styles.messageContainer}>{binaryMessage}</div>
      <div style={{ margin: "20px auto" }}>Message received:</div>
      <div style={styles.messageContainer}>{displayedMessage}</div>
    </div>
  );
};

export default MessageForm;
