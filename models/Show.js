const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
  title: String,
  year: String,
  genre: Array,
  language: String,
  director: String,
  actors: Array,
  plot: String,
  rating: Number,
  totalSeasons: Number,
  network: String,
  schedule: Object,
});

const Show = mongoose.model("show", ShowSchema);
module.exports = Show;
