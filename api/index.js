import { 
  getRestaurants,
  getRestaurantIdsWithFilter,
  getImageById,
  createRestaurantProfile,
  createRestaurantProfilesArr,
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

    createRestaurantProfilesArr(res).then(res => {

      let ansObj = {};

    
      io.on("connection", (socket) => {
    
        socket.on('new match session', (user) => {
          console.log("starting new session");
          let resCopy = [...res]
          shuffleArray(resCopy);
          ansObj[user] = {
            restaurants: [...resCopy],
            yay: [],
            nay: [],
          }
          socket.emit('response', ansObj[user])
        })
    
        socket.on('answer', (ans) => {
          if (ans.ans === 'yay') {
            ansObj[ans.user]['yay'].push(ans.restaurant);
            for (const user in ansObj) {
              if (user['yay'].includes(ans.restaurant)) {
                console.log("WE GOT A MATCH");
              }
            }
          } else {
            ansObj[ans.user]['nay'].push(ans.restaurant);
          }
          console.log(ansObj)
        });
      });
    })
  })
});