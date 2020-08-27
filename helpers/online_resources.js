const axios = require("axios");
const Movie = require("../models/Movie");

exports.searchOnlineResource = async (searchTerm, type) => {
  //If criteria type (movie or show) not specified or if criteria type is movie, call movie resource
  if (!type || type === "movie") {
    const result = await axios.get(
      `http://www.omdbapi.com/?t=${searchTerm}&apikey=24ef68c2`
    );
    return result.data;

    // else if specified criteria type is show, call shows resource
  } else if (type === "show") {
    const result = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    return result.data[0].show;
  }
};

exports.saveResourceToDb = async (data) => {
  const { Title, Year, Director, Actor, Genre, Plot, imdbRating } = data;

  const resource = new Movie({
    Title,
    Year,
    Director,
    Actor,
    Genre,
    Plot,
    Rating: imdbRating,
  });

  return await resource.save();
};
