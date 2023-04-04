const {
  getMoviesService,
  addMovieService,
  deleteMovieService,
  getCurrentMovieService,
} = require("../services/movieService");

const getMovies = async (req, res) => {
  const user = req.user;
  const data = await getMoviesService(user);
  res.status(200).send({ status: `Successfully!`, data });
};

const addMovie = async (req, res) => {
  const movie = req.body;
  const id = req.user._id;
  const data = await addMovieService(movie, id);
  res.status(200).json({ status: `Successfully!`, data });
};

const deleteMovie = async (req, res) => {
  const userId = req.user._id;
  const movieId = req.query.id;
  await deleteMovieService(userId, movieId);
  res.status(204).json({ status: "No content" });
};

const getCurrentMovie = async (req, res) => {
  const userId = req.user._id;
  const movieId = req.query.id;
  const data = await getCurrentMovieService(userId, movieId);
  res.status(200).json({ status: "Successfully!", data: data });
};

module.exports = {
  addMovie,
  getMovies,
  deleteMovie,
  getCurrentMovie,
};
