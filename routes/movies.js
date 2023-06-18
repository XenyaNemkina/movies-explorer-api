const express = require('express');
const { validateMovie /* validateMovieById */ } = require('../validators/movieValidator');

const movieRouter = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', validateMovie, createMovie);

movieRouter.delete('/:movieId', /* validateMovieById */ deleteMovie);

module.exports = movieRouter;
