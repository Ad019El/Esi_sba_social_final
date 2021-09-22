const router = require("express").Router();
let Sous_chapitre = require("../models/Sous_chapitre.model");

//get all
router.route("/").get((req, res) => {
  Sous_chapitre.find()
    .then((sous_chapitres) => res.json(sous_chapitres))
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  const description = req.body.description;
  const titre = req.body.titre;
  const sold = 0;
  const credit = 0;
  const debit = 0;
  const chapitre = req.body.chapitre;

  const newSousChapitre = new Sous_chapitre({
    titre,
    description,
    chapitre,
    sold,
    credit,
    debit,
  });

  newSousChapitre
    .save()
    .then(() => res.json("Sous-chapitre ajouté!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//sold credit debit
router.route("/info").get((req, res) => {
  Sous_chapitre.find()
    .then((sous_chapitres) => {
      var sold = 0,
        credit = 0,
        debit = 0;
      for (const element of sous_chapitres) {
        sold += element.sold;
        credit += element.credit;
        debit += element.debit;
      }
      res.json({ sold: sold, credit: credit, debit: debit });
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//get one
router.route("/:id").get((req, res) => {
  Sous_chapitre.findById(req.params.id)
    .then((sous_chapitres) => res.json(sous_chapitres))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete one
router.route("/:id").delete((req, res) => {
  Sous_chapitre.findByIdAndDelete(req.params.id)
    .then(() => res.json("Sous-chapitre supprimé"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update one
router.route("/update/:id").post((req, res) => {
  Sous_chapitre.findById(req.params.id)
    .then((sous_chapitre) => {
      if (req.body.titre != null) sous_chapitre.titre = req.body.titre;
      if (req.body.description != null)
        sous_chapitre.description = req.body.description;
      if (req.body.chapitre != null) sous_chapitre.chapitre = req.body.chapitre;
      if (req.body.credit != null) sous_chapitre.credit = req.body.credit;
      if (req.body.debit != null) sous_chapitre.debit = req.body.debit;
      if (req.body.sold != null) sous_chapitre.sold = req.body.sold;
      sous_chapitre
        .save()
        .then(() => res.json("Sous-chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//increase one
router.route("/plus/:id").post((req, res) => {
  Sous_chapitre.findById(req.params.id)
    .then((sous_chapitre) => {
      sous_chapitre.credit += req.body.credit;
      sous_chapitre.sold += req.body.credit;
      sous_chapitre
        .save()
        .then(() => res.json("Sous-chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//decrease one
router.route("/mines/:id").post((req, res) => {
  Sous_chapitre.findById(req.params.id)
    .then((sous_chapitre) => {
      sous_chapitre.debit += req.body.debit;
      sous_chapitre.sold -= req.body.debit;
      sous_chapitre
        .save()
        .then(() => res.json("Sous-chapitre modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
