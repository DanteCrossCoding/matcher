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
    return router;
};
