const Movie = require("../models/Movie");
const onlineResources = require("../helpers/online_resources");
const { search } = require("../routes/movie");

const {
  searchOnlineResources: searchOnlineResource,
  saveResourceToDb,
} = onlineResources;

exports.searchLocalDb = async (req, res, next) => {
  const searchTerm = req.query.movieName;
  if (!searchTerm || searchTerm === "") {
    res.status(400).send({ msg: "Search parameter cannot be empty" });
    return;
  }

  try {
    //Search for a movie in local db
    const foundMovies = await Movie.find({
      //make search query case insesitive
      Title: { $regex: searchTerm, $options: "i" },
    });

    // If no movie with specified name in local db go to next middleware
    if (foundMovies.length === 0) {
      next();
      return;
    }

    res.status(200).json(foundMovies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.saveToLocalDb = async (req, res) => {
  const searchTerm = req.query.movieName;

  if (!searchTerm || searchTerm === "") {
    res.status(400).send({ msg: "Search parameter cannot be empty" });
    return;
  }
  //Get specified movie data from online resource and save to local db
  try {
    const resultData = await searchOnlineResource(searchTerm);
    const savedData = await saveResourceToDb(resultData);
    res
      .status(200)
      .json({ msg: "Resource saved to local database", savedData });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

exports.searchSpecific = async (req, res) => {
  const searchTerm = req.query.movieName;
  if (!searchTerm || searchTerm === "") {
    res.status(400).send({ msg: "Search parameter cannot be empty" });
    return;
  }

  try {
    //Search record in local db that matches given term
    const resourceFound = await Movie.findOne(
      //make query case insesitive,
      //find all records that contain exact Title
      { Title: { $regex: "^" + searchTerm + "$", $options: "i" } }
    );

    if (!resourceFound) {
      res.status(404).send({ msg: "No records match your search" });
      return;
    }
    res.status(200).json(resourceFound);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.deleteResourceFromDb = async (req, res) => {
  const searchTerm = req.query.movieName;
  if (!searchTerm || searchTerm === "") {
    res.status(400).send({ msg: "Search parameter cannot be empty" });
    return;
  }

  try {
    const resourceFound = await Movie.findOne(
      //make delete query case insesitive and exact match
      { Title: { $regex: "^" + searchTerm + "$", $options: "i" } }
    );

    //Check if exists in local db
    if (!resourceFound) {
      res.status(404).send({ msg: "Resource not found in local db" });
      return;
    }

    await resourceFound.remove();
    res.status(200).json({
      msg: "Resource successfully removed from db",
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
