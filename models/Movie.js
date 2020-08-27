const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  Title: String,
  Year: String,
  Genre: String,
  Director: String,
  Actors: String,
  Plot: String,
  Rating: Number,
});

const Movie = mongoose.model("movie", MovieSchema);
module.exports = Movie;
