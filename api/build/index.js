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
        const testoraunts = ['8IUK_KGorRQ4yfa5h6ANcQ',
            'ba7QMdfLHj2ayzssvKJ6-A',
            'JgSGpSMHbGecAXs_o1rE_g',
            'vnKoBdTuh2lsUKASMwQYbA',
            'NN19pPLwqETuATMNlUNb_Q',
            'K1943yeGQELTUeiH6bDa2g',
            'UAcbpL0tF-URY0yKlLw6ow',
            'AEOyRbQtYD3bmX1qJWvt4g',
            'uxJqItMyU6pAJxxmveiXBw',
            'Hcw11wj3TMoP5Deg66bJig'];
        yelp_1.createRestaurantProfilesArr(res).then(res => console.log(res));
        let ansObj = {};
        io.on("connection", (socket) => {
            socket.on('new match session', (ans) => {
                console.log("starting new session");
                let resCopy = [...res];
                yelp_1.shuffleArray(resCopy);
                ansObj[ans] = {
                    restaurants: [...resCopy],
                    yay: [],
                    nay: [],
                };
                socket.emit('response', ansObj[ans]);
            });
            socket.on('answer', (ans) => {
                if (ans.ans === 'yay') {
                    ansObj[ans.user]['yay'].push(ans.restaurant);
                }
                else {
                    ansObj[ans.user]['nay'].push(ans.restaurant);
                }
                console.log(ansObj);
            });
        });
    });
});
