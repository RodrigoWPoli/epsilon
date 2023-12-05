const express = require('express')
const routes = require('./routes');
const app = express();


app.use('/api', routes);

app.get("/api", (req, res) => {
    res.json("test");
})

app.listen(5000, () => {console.log("Server is listening on port 5000")});