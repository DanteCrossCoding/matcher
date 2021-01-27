import {
  getRestaurantIdsWithFilter,
  createRestaurantProfilesArr,
  shuffleArray,
} from "./externalAPI/yelp";

require("dotenv").config();
const pg = require("pg-promise")();
const db = pg(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
const server = http.createServer(app);

const io = require("socket.io")(server);
const matches = require("./routes/matches")

app.get("/test", (req: any, res: any) => {
  res.send("Backend connected!");
});

app.get('/users', (req: any, res: any) => {
  db.query('SELECT * FROM users')
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => console.log("user call error", err));
});



app.use('/matches', matches(db));

const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log("Server started listening on port " + port);

  let ansObj: any = {};
  let basket: any = {};

  io.on("connection", (socket: any) => {

    socket.on('disconnect', () => {
      for (const user in basket) {
        if (basket[user] = socket.id) {
          basket[user] = ""
          ansObj[user] = { yay: [], nay: [] }
          console.log(`removed user ${user}`)
        }
      }
    })

    socket.on("new match session", (response: any) => {
      basket[response.user] = socket.id;
      console.log("starting new session");
      ansObj[response.user] = {
        yay: [],
        nay: [],
      };
      const restaurants = getRestaurantIdsWithFilter(response.category);
      restaurants.then((res: any) => {
        createRestaurantProfilesArr(res).then((res) => {
          const resCopy = [...res];
          shuffleArray(resCopy);
          socket.emit("connection", resCopy);
        });
      });
      console.log(ansObj);
    });

    socket.on("answer", (ans: any) => {
      if (ans.ans === "yay") {
        for (const user in ansObj) {
          if (ansObj[user]["yay"].includes(ans.restaurantPhone) && user !== ans.user.email) {
            db.query('INSERT INTO matches (user_id, partner_id, restaurant) VALUES ($1, $2, $3);', [ans.user_id, ans.partner_id, ans.restaurant.name])
              .catch((err: any) => console.error('Match query error', err))
            db.query('INSERT INTO matches (user_id, partner_id, restaurant) VALUES ($1, $2, $3);', [ans.partner_id, ans.user_id, ans.restaurant.name])
              .catch((err: any) => console.error('Match query error', err))
            socket.broadcast.emit("match", ans.restaurant.name)
            break;
          }
        }
        if (!ansObj[ans.user.email]["yay"].includes(ans.restaurantPhone))
          ansObj[ans.user.email]["yay"].push(ans.restaurantPhone);
      } else {
        if (ansObj[ans.user.email]["yay"].includes(ans.restaurantPhone)) {
          ansObj[ans.user.email]["yay"].splice(ansObj[ans.user.email]["yay"].indexOf(ans.restaurantPhone), 1)
        }
        ansObj[ans.user.email]["nay"].push(ans.restaurantPhone);
      }
      console.log(ansObj);
    });

    socket.on("reset", (user: any) => {
      socket.to(basket[user]).emit('resetCarousel', 'resetCarousel')
      ansObj[user] = { yay: [], nay: [] }
    });

    socket.on('invite', (response: any) => {
      socket.broadcast.emit('invitation', response)
    })

    socket.on("change category", (response: any) => {
      console.log("response: " + response.partner)
      const restaurants = getRestaurantIdsWithFilter(response.category);
      restaurants.then((res: any) => {
        createRestaurantProfilesArr(res).then((res) => {
          socket.broadcast.emit("notify", response)
          const resCopy = [...res];
          shuffleArray(resCopy);
          socket.emit("query response", resCopy);
        });
      });
    });

  });
});
