const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SchemaTypes } = mongoose;

const Favorite = new Schema({
  title: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    default: "No overview",
  },
  release_date: {
    type: String,
    default: "No release date",
  },
  vote_average: {
    type: String,
    default: "No vote average",
  },
  poster_path: {
    type: String,
    default: "No poster path",
  },
  genres: {
    type: Array,
    default: "No genres",
  },
  production_companies: {
    type: Array,
    default: "No production companies",
  },
  production_countries: {
    type: Array,
    default: "",
  },
  vote_count: {
    type: String,
    default: "No vote count",
  },
  owner: {
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Favorite", Favorite);
