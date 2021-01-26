"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yelp_1 = require("./externalAPI/yelp");
require("dotenv").config();
const pg = require("pg-promise")();
const db = pg(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
const server = http.createServer(app);
const io = require("socket.io")(server);
const matches = require("./routes/matches");
app.get("/test", (req, res) => {
    res.send("Backend connected!");
});
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users')
        .then((data) => {
        res.send(data);
    })
        .catch((err) => console.log("user call error", err));
});
app.use('/matches', matches(db));
const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log("Server started listening on port " + port);
    let ansObj = {};
    let basket = {};
    io.on("connection", (socket) => {
        socket.on('disconnect', () => {
            for (const user in basket) {
                if (basket[user] = socket.id) {
                    basket[user] = "";
                    ansObj[user] = { yay: [], nay: [] };
                    console.log(`removed user ${user}`);
                }
            }
        });
        socket.on("new match session", (response) => {
            basket[response.user] = socket.id;
            console.log("starting new session");
            ansObj[response.user] = {
                yay: [],
                nay: [],
            };
            const restaurants = yelp_1.getRestaurantIdsWithFilter(response.category);
            restaurants.then((res) => {
                yelp_1.createRestaurantProfilesArr(res).then((res) => {
                    const resCopy = [...res];
                    yelp_1.shuffleArray(resCopy);
                    socket.emit("connection", resCopy);
                });
            });
            console.log(ansObj);
        });
        socket.on("answer", (ans) => {
            if (ans.ans === "yay") {
                for (const user in ansObj) {
                    if (ansObj[user]["yay"].includes(ans.restaurantPhone) && user !== ans.user.email) {
                        db.query('INSERT INTO matches (user_id, partner_id, restaurant) VALUES ($1, $2, $3);', [ans.user_id, ans.partner_id, ans.restaurant.name])
                            .catch((err) => console.error('Match query error', err));
                        db.query('INSERT INTO matches (user_id, partner_id, restaurant) VALUES ($1, $2, $3);', [ans.partner_id, ans.user_id, ans.restaurant.name])
                            .catch((err) => console.error('Match query error', err));
                        socket.broadcast.emit("match", ans.restaurant.name);
                        break;
                    }
                }
                if (!ansObj[ans.user.email]["yay"].includes(ans.restaurantPhone))
                    ansObj[ans.user.email]["yay"].push(ans.restaurantPhone);
            }
            else {
                if (ansObj[ans.user.email]["yay"].includes(ans.restaurantPhone)) {
                    ansObj[ans.user.email]["yay"].splice(ansObj[ans.user.email]["yay"].indexOf(ans.restaurantPhone), 1);
                }
                ansObj[ans.user.email]["nay"].push(ans.restaurantPhone);
            }
            console.log(ansObj);
        });
        socket.on("reset", (user) => {
            socket.to(basket[user]).emit('resetCarousel', 'resetCarousel');
            ansObj[user] = { yay: [], nay: [] };
        });
        socket.on('invite', (response) => {
            socket.broadcast.emit('invitation', response);
        });
        socket.on("change category", (response) => {
            console.log("response: " + response.partner);
            const restaurants = yelp_1.getRestaurantIdsWithFilter(response.category);
            restaurants.then((res) => {
                yelp_1.createRestaurantProfilesArr(res).then((res) => {
                    socket.broadcast.emit("notify", response);
                    const resCopy = [...res];
                    yelp_1.shuffleArray(resCopy);
                    socket.emit("query response", resCopy);
                });
            });
        });
    });
});
