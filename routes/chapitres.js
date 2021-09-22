const router = require("express").Router();
let Chapitre = require("../models/chapitre.model");

//get all
router.route("/").get((req, res) => {
  Chapitre.find()
    .then((chapitres) => res.json(chapitres))
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  const description = req.body.description;
  const titre = req.body.titre;
  const newChapitre = new Chapitre({ titre, description });

  newChapitre
    .save()
    .then(() => res.json("Chapitre ajouté!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get one
router.route("/:id").get((req, res) => {
  Chapitre.findById(req.params.id)
    .then((chapitres) => res.json(chapitres))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete one
router.route("/:id").delete((req, res) => {
  Chapitre.findByIdAndDelete(req.params.id)
    .then(() => res.json("Chapitre supprimé."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update one
router.route("/update/:id").post((req, res) => {
  Chapitre.findById(req.params.id)
    .then((chapitre) => {
      if (req.body.titre != null) chapitre.titre = req.body.titre;
      if (req.body.description != null)
        chapitre.description = req.body.description;

      chapitre
        .save()
        .then(() => res.json("Chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//increase one
router.route("/plus/:id").post((req, res) => {
  Chapitre.findById(req.params.id)
    .then((chapitre) => {
      chapitre.credit += req.body.credit;
      chapitre.sold += req.body.credit;
      chapitre
        .save()
        .then(() => res.json("Chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//decrease one
router.route("/mines/:id").post((req, res) => {
  Chapitre.findById(req.params.id)
    .then((chapitre) => {
      chapitre.debit += req.body.debit;
      chapitre.sold -= req.body.debit;
      chapitre
        .save()
        .then(() => res.json("Chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
