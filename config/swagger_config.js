const swaggerJSDoc = require("swagger-jsdoc");

const swaggerConfig = {
  swaggerDefinition: {
    info: {
      title: "Movie API",
      decription: "Search movies/shows information",
      servers: [
        "http://localhost:3000/",
        "https://movie-search123.herokuapp.com/",
      ],
      version: "1.0.0",
    },
  },

  apis: ["routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerConfig);

module.exports = swaggerDocs;
