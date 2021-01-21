const express = require("express");

const router  = express.Router();

module.exports = (db: any) => {
  router.get('/:user_id/:partner_id', (req: any, res: any) => {
    db.query('SELECT * FROM matches WHERE user_id = $1 AND partner_id = $2', [req.params.user_id.substring(1), req.params.partner_id.substring(1)])
      .then((data: any) => {
        res.send(data)
      })
      .catch((err: any) => {
        res.send(err)
      })
  });
  
  return router;
}