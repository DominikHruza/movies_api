const Movie = require("../models/Movie");
const onlineResources = require("../helpers/online_resources");

const { searchOnlineResource, saveResourceToDb } = onlineResources;

exports.searchMovieInDb = async (req, res) => {
  const searchTerm = req.query.movieName;

  try {
    //Search for a movie in local db
    const foundMovies = await Movie.find({
      //make search query case insesitive
      Title: { $regex: searchTerm, $options: "i" },
    });

    // If no movie with specified name in local db
    if (foundMovies.length === 0) {
      //Get specified movie data from online resource and save to local db
      const resultData = await searchOnlineResource(searchTerm);
      const savedData = await saveResourceToDb(resultData);
      res.status(200).json(savedData);
      return;
    }

    res.status(200).json(foundMovies);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
