const router = require("express").Router();
let User = require("../models/User");

//get notifications of user
router.route("/").get((req, res) => {
  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
