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
  const [encodedMessage, setEncodedMessage] = useState("");
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
  const binarizeMessage = (text) => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  };
  const deBinarizeMessage = (data) => {
    const text = data.decodedData.join("")
    if (!/^[01]+$/.test(text)) {
      console.log(text)
      throw new Error("Invalid binary string. It should only contain 0s and 1s.");
  }
  const binaryChunks = text.match(/.{1,8}/g);
  const decimalChars = binaryChunks.map((chunk) => parseInt(chunk, 2));
  const asciiText = String.fromCharCode(...decimalChars);
  return asciiText;
  };

  const sendMessage = async (message) => {
    try {
      // Send the binary message to the backend
      const response = await fetch("/api/encode", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message}),
      });

      // Handle the response from the backend as needed
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSendMessage = async () => {
    const encryptedMessage = encryptMessage(message);
    const binaryMessage = binarizeMessage(encryptedMessage);
    const encodedMessage = await sendMessage(binaryMessage);


    //receive from backend
    const deBinarizedMessage = deBinarizeMessage(encodedMessage);
    const decryptedMessage = decryptMessage(deBinarizedMessage);
    setEncryptedMessage(encryptedMessage);
    setBinaryMessage(binaryMessage);
    setDisplayedMessage(decryptedMessage);
    setEncodedMessage(encodedMessage)
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
