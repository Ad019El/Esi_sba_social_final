const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offreSChema = new Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { timestamps: true }
);

const Offre = mongoose.model("Offre", offreSChema);

module.exports = Offre;
