const express = require('express')
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
})
app.post('/api/sendBinaryMessage', upload.single('binaryMessage'), (req, res) => {
    // Access binary data from req.file.buffer
    const binaryData = req.file.buffer;
  
    // Handle binary data as needed
    
    res.json({ success: true });
  });

app.listen(5000, () => {console.log("Server is listening on port 5000")});