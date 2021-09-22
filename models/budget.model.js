const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budget = new Schema(
  {
    amount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budget);

module.exports = Budget;
