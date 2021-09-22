const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    titre: { type: String, required: true },
    designation: { type: String, required: true },
    sous_chapitre: { type: String, required: true },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
