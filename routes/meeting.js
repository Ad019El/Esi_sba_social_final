const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Meeting = require("../models/Meeting");

//  @route       POST api/meeting
//  @desc        Register a meeting
//  @access      Private
router.post(
  "/",
  auth,
  [
    check("title", "Please include a valid email").not().isEmpty(),
    check("detailles", "Offer is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { title, date, detailles } = req.body;

    meeting = new Meeting({ title, date, detailles });

    await meeting.save();

    const payload = {
      meeting: {
        id: meeting.id,
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

//  @route       GET api/meeting
//  @desc        Get admin meetings
//  @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({
      date: -1,
    });
    res.json(meetings);
  } catch (error) {
    console.log(error.meeting);
    res.status(500).send("Server Error");
  }
});

//  @route       DELETE api/meeting/:id
//  @desc        Delete meeting
//  @access      Private
router.delete("/:id", (req, res) => {
  Meeting.findById(req.params.id).then((meeting) =>
    meeting
      .remove()
      .then(() => res.json({ success: true }))
      .catch((error) => {
        res.status(404).json({ error: "Id not found" });
      })
  );
});

module.exports = router;
