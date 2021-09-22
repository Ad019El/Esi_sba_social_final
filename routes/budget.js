const router = require("express").Router();
let Budget = require("../models/Budget.model");

//get
router.route("/").get((req, res) => {
  Budget.find()
    .then((budgets) => {
      res.json(budgets[0]);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//post one
router.route("/add").post((req, res) => {
  const amount = req.body.amount;

  const newBudget = new Budget({
    amount,
  });

  newBudget
    .save()
    .then(() => res.json("Budget ajouté!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//increase
router.route("/plus").post((req, res) => {
  const amount = req.body.amount;

  Budget.find().then((budgets) => {
    if (budgets.length == 0) {
      const amount = amount;
      const newBudget = new Budget({
        amount,
      });
      newBudget
        .save()
        .then(() => res.json("Budget ajouté!"))
        .catch((err) => res.status(400).json("Error:" + err));
    } else {
      budgets[0].amount += amount;
      budgets[0]
        .save()
        .then(() => res.json("Budget modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    }
  });
});

//decrease
router.route("/mines").post((req, res) => {
  const amount = req.body.amount;

  Budget.find().then((budgets) => {
    budgets[0].amount -= amount;
    budgets[0]
      .save()
      .then(() => res.json("Budget modifié."))
      .catch((err) => res.status(400).json("Error:" + err));
  });
});

//delete one
router.route("/:id").delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json("Budget supprimé"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//update one
router.route("/update/:id").post((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => {
      budget.amount = req.body.amount;
      budget
        .save()
        .then(() => res.json("Budget modifié."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
