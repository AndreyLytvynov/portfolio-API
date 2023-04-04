const { NotAuthorizedError } = require("../helpers/errors");
const Favorite = require("../models/movies.mdel");

const getMoviesService = async ({ _id }) => {
  const movies = await Favorite.find({ owner: _id });
  if (!movies) {
    throw new NotAuthorizedError("Not found");
  }
  return movies;
};

const addMovieService = async (movie, id) => {
  const movies = { ...movie, owner: id };
  const newMovie = await Favorite.create(movies);
  return newMovie;
};

const deleteMovieService = async (userId, movieId) => {
  const data = await Favorite.findOneAndDelete({ owner: userId, id: movieId });
  return data;
};

const getCurrentMovieService = async (userId, movieId) => {
  const data = await Favorite.findOne({ owner: userId, id: movieId });

  return data;
};

module.exports = {
  getMoviesService,
  addMovieService,
  deleteMovieService,
  getCurrentMovieService,
};
