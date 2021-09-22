const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapitreSChema = new Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    credit: { type: Number, required: true, default: 0 },
    debit: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Chapitre = mongoose.model("Chapitre", chapitreSChema);

module.exports = Chapitre;
