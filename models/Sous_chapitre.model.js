const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sous_chapitreSChema = new Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    credit: { type: Number, required: true, default: 0 },
    debit: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    chapitre: { type: String, required: true },
  },
  { timestamps: true }
);

const Sous_chapitre = mongoose.model("Sous_chapitre", sous_chapitreSChema);

module.exports = Sous_chapitre;
