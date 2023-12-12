import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import LineChart from "./Graph";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [encodedMessage, setEncodedMessage] = useState("");
  const [binaryMessage, setBinaryMessage] = useState("");
  const [receiveButtonClicked, setReceiveButtonClicked] = useState(false);
  const secretKey = "epsilon"; // encryption key

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
    const text = data.join("");
    if (!/^[01]+$/.test(text)) {
      throw new Error(
        "Invalid binary string. It should only contain 0s and 1s."
      );
    }
    const binaryChunks = text.match(/.{1,8}/g);
    const decimalChars = binaryChunks.map((chunk) => parseInt(chunk, 2));
    const asciiText = String.fromCharCode(...decimalChars);
    return asciiText;
  };

  const binaryEncoding = (data) => {
    const bitArray = [];

    for (const bit of data) {
      if (bit === "+") {
        bitArray.push(1);
      } else if (bit === "-") {
        bitArray.push(-1);
      } else {
        bitArray.push(0);
      }
    }
    const decodedMessage = [...bitArray];
    return decodedMessage;
  };

  const sendMessage = async (message) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.encodedData[1];
    } catch (error) {
      throw error;
    }
  };

  const receiveMessage = async () => {
    try {
      const response = await axios.get("/api/receive");
      return response.data;
    } catch (error) {
      console.error("Error receiving message:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    const encryptedMessage = encryptMessage(message);
    const binaryMessage = binarizeMessage(encryptedMessage);
    const encodedMessage = await sendMessage(binaryMessage);

    setEncryptedMessage(encryptedMessage);
    setBinaryMessage(binaryMessage);
    setEncodedMessage(encodedMessage);
    setMessage("");
  };

  const handleReceiveMessage = async () => {
    try {
      setReceiveButtonClicked(true);

      const data = await receiveMessage();
      const deBinarizedMessage = deBinarizeMessage(data.decodedData);
      const decryptedMessage = decryptMessage(deBinarizedMessage);

      setEncryptedMessage(deBinarizedMessage);
      setBinaryMessage(data.decodedData);
      setDisplayedMessage(decryptedMessage);
      setEncodedMessage(binaryEncoding(data.receivedData));
      setMessage("");
    } finally {
      setReceiveButtonClicked(false);
    }
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
        <div style={{ margin: "20px auto" }}>Message:</div>
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
      <button
        onClick={handleReceiveMessage}
        style={{
          padding: "10px",
          backgroundColor: receiveButtonClicked ? "#3498db" : "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Receive Message
      </button>
      <div style={{ margin: "20px auto" }}>Message received:</div>
      <div style={styles.messageContainer}>{displayedMessage}</div>
      <div style={{ margin: "20px auto" }}>Graph:</div>
      {encodedMessage && (
        <div>
          <LineChart data={encodedMessage} />
        </div>
      )}
    </div>
  );
};
export default MessageForm;
