const { response } = require("express");

const router = require("express").Router();

module.exports = (db: any) => {
  router.get("/users", (request: any, response: any) => {
    db.query('SELECT * FROM users'
    ).then((res: any) => {
      console.log(res)
    });
  })
}