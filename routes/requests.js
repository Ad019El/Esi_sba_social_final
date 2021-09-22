const router = require("express").Router();
let Offre = require("../models/Request");

//  @route       POST api/request
//  @desc        Register a request
//  @access      Private
//post one
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const category = req.body.category;
  const offer = req.body.offer;
  const request_accept = false;

  const newOffre = new Offre({ name, email, category, offer, request_accept });

  newOffre
    .save()
    .then(() => res.json("request added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
