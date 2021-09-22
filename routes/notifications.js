const router = require("express").Router();
let Notification = require("../models/notification.model");

//get all
router.route("/").get((req, res) => {
  Notification.find()
    .then((notifications) => res.json(notifications))
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  const user = req.body.user;
  const content = req.body.content;
  const title = req.body.title;
  const isViewed = "false";
  const newNotification = new Notification({ user, content, title, isViewed });

  newNotification
    .save()
    .then(() => res.json("Notification ajouté!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get one
router.route("/:id").get((req, res) => {
  Notification.findById(req.params.id)
    .then((notifications) => res.json(notifications))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete one
router.route("/:id").delete((req, res) => {
  Notification.findByIdAndDelete(req.params.id)
    .then(() => res.json("Notification supprimé."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get notifications of user
router.route("/user/:ide").get((req, res) => {
  Notification.find({ user: req.params.ide })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
