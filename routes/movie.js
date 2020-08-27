const express = require("express");
const router = express.Router();
const movieCtrl = require("../controllers/movieCtrl");
const validateParam = require("../helpers/validate_param");

const {
  searchLocalDb,
  deleteResourceFromDb,
  searchSpecific,
  searchResources,
} = movieCtrl;

/**
 * @swagger
 * path:
 *  /api/movie/search-save:
 *    get:
 *      summary: Get movie that match search param from online resource. Save to local database
 *      parameters:
 *        - in: query
 *          name: movieName
 *          schema:
 *            type: string
 *          required: false
 *          description: Name of the movie
 *      responses:
 *        "200":
 *          description: List of movie objects
 *        "400":
 *          description: Bad request
 *        "500":
 *          description: Server error
 */
router.get("/search-save", validateParam, searchResources, searchLocalDb);

/**
 * @swagger
 * path:
 *  /api/movie/search-specific:
 *    get:
 *      summary: Get single movie from local db that matches your search param
 *      parameters:
 *        - in: query
 *          name: movieName
 *          schema:
 *            type: string
 *          required: false
 *          description: Name of the movie
 *      responses:
 *        "200":
 *          description: SIngle movie object with details
 *        "400":
 *          description: Bad request
 *        "404":
 *          description: Not found in local database
 *        "500":
 *          description: Server error
 */
router.get("/search-specific", validateParam, searchSpecific);

/**
 * @swagger
 * path:
 *  /api/movie/search-all:
 *    get:
 *      summary: Get all  movies from local db that matches your search param
 *      parameters:
 *        - in: query
 *          name: movieName
 *          schema:
 *            type: string
 *          required: false
 *          description: Name of the movie
 *      responses:
 *        "200":
 *          description: List of movie objects with details
 *        "400":
 *          description: Bad request
 *        "404":
 *          description: Not found in local database
 *        "500":
 *          description: Server error
 */
router.get("/search-all", validateParam, searchLocalDb);

/**
 * @swagger
 * path:
 *  /api/movie/delete:
 *    delete:
 *      summary: Delete movie by name
 *      parameters:
 *        - in: query
 *          name: movieName
 *          schema:
 *            type: string
 *          required: false
 *          description: Name of the movie
 *      responses:
 *        "200":
 *          description: A delete success message
 *        "400":
 *          description: Bad request
 *        "404":
 *          description: Movie not found in local db
 *        "500":
 *          description: Server error
 */
router.delete("/delete", validateParam, deleteResourceFromDb);

module.exports = router;
