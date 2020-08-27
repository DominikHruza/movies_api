const axios = require("axios");
const Movie = require("../models/Movie");

exports.searchOnlineResources = async (searchTerm, type) => {
  //If criteria type (movie or show) not specified or if criteria type is movie, call movie resource
  if (!type || type === "movie") {
    const result = await axios.get(
      `http://www.omdbapi.com/?t=${searchTerm}&apikey=24ef68c2`
    );

    if (result.data.Error) {
      throw new Error("Online resource: No movies match your search!");
    }
    return result.data;
  }

  //Implement next resource type here..
  //
  //
};

exports.saveResourceToDb = async (data, type) => {
  let resource;
  if (!type || type === "movie") {
    const { Title, Year, Director, Actor, Genre, Plot, imdbRating } = data;
    resource = new Movie({
      Title,
      Year,
      Director,
      Actor,
      Genre,
      Plot,
      Rating: imdbRating,
    });
  }

  //Implement next resource type here..
  //
  //

  return await resource.save();
};
