import express = require("express");

const app = express();

app.get('/test', (req: any, res: any) => {
  res.send("Backend connected!");
});

const port = process.env.PORT || 9000;

app.listen(port);

console.log("Server started listening on port " + port);