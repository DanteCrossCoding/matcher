"use strict";
const { response } = require("express");
const router = require("express").Router();
module.exports = (db) => {
    router.get("/users", (request, response) => {
        db.query('SELECT * FROM users').then((res) => {
            console.log(res);
        });
    });
};
