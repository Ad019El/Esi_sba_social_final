const router = require("express").Router();
let Article = require("../models/article.model");

//get all
router.route("/").get((req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  titre = req.body.titre;
  designation = req.body.designation;
  sous_chapitre = req.body.sous_chapitre;

  const newArticle = new Article({
    titre: titre,
    designation: designation,
    sous_chapitre: sous_chapitre,
  });

  newArticle
    .save()
    .then(() => res.json("Article ajouté"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//get one
router.route("/:id").get((req, res) => {
  Article.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json("Error:" + err));
});

//delete one
router.route("/:id").delete((req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((article) => res.json("Article supprimé"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update one
router.route("/update/:id").post((req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (req.body.titre != null) article.titre = req.body.titre;
      if (req.body.designation != null)
        article.designation = req.body.designation;
      if (req.body.sous_chapitre != null)
        article.sous_chapitre = req.body.sous_chapitre;

      article
        .save()
        .then(() => res.json("Article modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
