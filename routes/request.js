const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Request = require("../models/Request");

//  @route       POST api/request
//  @desc        Register a request
//  @access      Private
router.post(
  "/",
  auth,
  [
    check("email", "Please include a valid email").isEmail(),
    check("category", "Category is required").not().isEmpty(),
    check("offer", "Offer is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { name, email, category, offer } = req.body;

    const request_accept = false;

    request = new Request({ name, email, category, offer, request_accept });

    await request.save();

    const payload = {
      request: {
        id: request.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600 * 1000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  }
);

//  @route       GET api/request
//  @desc        Get admin requests
//  @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const requests = await Request.find().sort({
      date: -1,
    });
    res.json(requests);
  } catch (error) {
    console.log(error.request);
    res.status(500).send("Server Error");
  }
});

//  @route       GET api/request
//  @desc        Get user requests
//  @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const requests = await Request.find({ request: req.user.id }).sort({
      date: -1,
    });
    res.json(requests);
  } catch (error) {
    console.log(error.request);
    res.status(500).send("Server Error");
  }
});

//  @route       GET api/request/fav
//  @desc        Get admin fav requests
//  @access      Private
router.get("/fav", auth, async (req, res) => {
  try {
    const requests = await Request.find({
      request_accept: true,
    }).sort({
      date: -1,
    });
    res.json(requests);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//  @route       PUT api/request/fav/:id
//  @desc        Add/Remove request to/from fav
//  @access      Private
router.put("/fav/:id", auth, async (req, res) => {
  try {
    let request = await Request.findById(req.params.id);

    if (!request) return res.status(404).json([{ msg: "Message not found" }]);

    request = await Request.findByIdAndUpdate(
      req.params.id,
      { request_accept: !request_accept },
      { new: true }
    );

    res.json(request);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//  @route       DELETE api/request/:id
//  @desc        Delete request
//  @access      Private
router.delete("/:id", (req, res) => {
  Request.findById(req.params.id).then((request) =>
    request
      .remove()
      .then(() => res.json({ success: true }))
      .catch((error) => {
        res.status(404).json({ error: "Id not found" });
      })
  );
});

//  @route       APPROVE api/request/:id
//  @desc        approve request
//  @access      Private
router.post("/:id", (req, res) => {
  Request.findByIdAndUpdate(req.params.id, { request_accept: true })
    .then(() => res.json({ success: true }))
    .catch((error) => {
      res.status(404).json({ error: "Id not found" });
    });
});
//post one
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const category = req.body.category;
  const offer = req.body.offer;
  const newOffre = new Offre({ name, email, category, offer });

  newOffre
    .save()
    .then(() => res.json("request added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
