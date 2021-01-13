"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/test', function (req, res) {
    res.send("Backend connected!");
});
var port = process.env.PORT || 9000;
app.listen(port);
console.log("Server started listening on port " + port);
