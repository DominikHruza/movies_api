const express = require("express");
const router = express.Router();
const movieCtrl = require("../controllers/movieCtrl");

const { searchMovieInDb } = movieCtrl;

/**
 * @swagger
 * path:
 *  /api/movie/search:
 *    get:
 *      summary: Get a movie by name
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: movieName
 *          schema:
 *            type: string
 *          required: true
 *          description: Name of the movie
 *      responses:
 *        "200":
 *          description: A movie object
 *        "500":
 *          description: Server error
 */
router.get("/search", searchMovieInDb);

module.exports = router;
