import { 
  getRestaurants,
  getRestaurantIdsWithFilter,
  getImageById,
  createRestaurantProfile,
  shuffleArray
 } from "./externalAPI/yelp"
 
require('dotenv').config();
const pg = require('pg-promise')();
const db = pg(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

app.get('/test', (req: any, res: any) => {
  res.send("Backend connected!");
});

app.get('/', (req: any, res: any) => {
  db.any(`SELECT * FROM users`)
  .then((data: any) => {
    res.send(data[0].name);
  });
});




const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log("Server started listening on port " + port);


  const restaurants = getRestaurantIdsWithFilter("chinese");
  restaurants.then((res: any) => {

    
    let ansObj: any = {};

    
    io.on("connection", (socket: any) => {
    
      socket.on('new match session', (ans: any) => {
        console.log("starting new session");
        let resCopy = [...res]
        shuffleArray(resCopy);
        ansObj[ans] = {
          restaurants: [...resCopy],
          yay: [],
          nay: [],
        }
        socket.emit('response', ansObj[ans])
      })
    
      socket.on('answer', (ans: any) => {
        if (ans.ans === 'yay') {
          ansObj[ans.user]['yay'].push(ans.restaurant);
        } else {
          ansObj[ans.user]['nay'].push(ans.restaurant);
        }
        console.log(ansObj)
      });

    });
    
  });
});