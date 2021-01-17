"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yelp_1 = require("./externalAPI/yelp");
require('dotenv').config();
const pg = require('pg-promise')();
const db = pg(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
app.get('/test', (req, res) => {
    res.send("Backend connected!");
});
app.get('/', (req, res) => {
    db.any(`SELECT * FROM users`)
        .then((data) => {
        res.send(data[0].name);
    });
});
const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log("Server started listening on port " + port);
    const restaurants = yelp_1.getRestaurantIdsWithFilter("chinese");
    restaurants.then((res) => {
        yelp_1.createRestaurantProfilesArr(res).then(res => {
            let ansObj = {};
            io.on("connection", (socket) => {
                socket.on('new match session', (user) => {
                    console.log("starting new session");
                    let resCopy = [...res];
                    yelp_1.shuffleArray(resCopy);
                    ansObj[user] = {
                        restaurants: [...resCopy],
                        yay: [],
                        nay: [],
                    };
                    socket.emit('response', ansObj[user]);
                });
                socket.on('answer', (ans) => {
                    if (ans.ans === 'yay') {
                        for (const user in ansObj) {
                            if (ansObj[user]['yay'].includes(ans.restaurant)) {
                                console.log('A MATCH');
                                socket.emit('match', ans.restaurant);
                                break;
                            }
                        }
                        ansObj[ans.user]['yay'].push(ans.restaurant);
                    }
                    else {
                        ansObj[ans.user]['nay'].push(ans.restaurant);
                    }
                    console.log(ansObj);
                });
                socket.on('reset', () => {
                    ansObj = {};
                });
            });
        });
    });
});
