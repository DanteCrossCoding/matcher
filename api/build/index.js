"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/test', (req, res) => {
    res.send("Backend connected!");
});
const port = process.env.PORT || 9000;
app.listen(port);
console.log("Server started listening on port " + port);
