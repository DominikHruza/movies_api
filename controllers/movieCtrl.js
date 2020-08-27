const Movie = require("../models/Movie");
const onlineResources = require("../helpers/online_resources");

const { searchOnlineResources, saveResourceToDb } = onlineResources;

exports.searchLocalDb = async (req, res, next) => {
  const searchTerm = req.query.movieName;

  try {
    //Get all movies in local db that match given criteria
    const foundMovies = await Movie.find({
      //make search query case insesitive
      Title: { $regex: searchTerm, $options: "i" },
    });

    if (foundMovies.length === 0) {
      res.status(404).send({ msg: "No records match your search" });
    }

    res.status(200).json(foundMovies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

exports.searchResources = async (req, res, next) => {
  const searchTerm = req.query.movieName;

  try {
    //Search data online
    const resultData = await searchOnlineResources(searchTerm);

    //Check if resource already in local db
    const found = await Movie.findOne({ Title: resultData.Title });

    //If movie exist run next midleware
    if (found) {
      next();
      return;
    }

    //Else save resource in database
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
