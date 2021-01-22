"use strict";
const express = require("express");
const router = express.Router();
module.exports = (db) => {
    router.get('/:user_id/:partner_id', (req, res) => {
        db.query('SELECT * FROM matches WHERE user_id = $1 AND partner_id = $2', [req.params.user_id.substring(1), req.params.partner_id.substring(1)])
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.send(err);
        });
    });
    router.post('/', (req, res) => {
        db.query('INSERT INTO matches (user_id, partner_id, restaurant) VALUES ($1, $2, $3), ($2, $1, $3);', [req.body.user_id, req.body.partner_id, req.body.restaurant])
            .then((data) => {
            console.log(data);
            res.send('data updated');
        })
            .catch((err) => console.log(err));
    });
    return router;
};
