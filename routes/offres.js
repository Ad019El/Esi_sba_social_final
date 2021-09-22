const router = require("express").Router();
let Offre = require("../models/offre.model");

//get all
router.route("/").get((req, res) => {
  Offre.find()
    .then((offre) => res.json(offre))
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  const description = req.body.description;
  const titre = req.body.titre;
  const detail = req.body.detail;
  const newOffre = new Offre({ titre, description, detail });

  newOffre
    .save()
    .then(() => res.json("Offre ajouté!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get one
router.route("/:id").get((req, res) => {
  Offre.findById(req.params.id)
    .then((offres) => res.json(offres))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete one
router.route("/:id").delete((req, res) => {
  Offre.findByIdAndDelete(req.params.id)
    .then(() => res.json("Offre supprimé."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update one
router.route("/update/:id").post((req, res) => {
  Offre.findById(req.params.id)
    .then((offre) => {
      if (req.body.titre != null) offre.titre = req.body.titre;
      if (req.body.description != null)
        offre.description = req.body.description;
      if (req.body.detail != null) offre.detail = req.body.detail;

      offre
        .save()
        .then(() => res.json("Offre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
