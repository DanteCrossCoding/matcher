"use strict";
const express = require("express");
const router = express.Router();
module.exports = (db) => {
    router.get('/:user_id/', (req, res) => {
        db.query('SELECT * FROM matches WHERE user_id = $1', [req.params.user_id.substring(1)])
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.send(err);
        });
    });
    return router;
};
