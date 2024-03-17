import {
  findMovieByTitle,
  findMoviesByGenre,
} from "./services/movieService.js";

const getMovieByTitle = async (req, res) => {
  const title = req.params.title;
  const movie = await findMovieByTitle(title);
  return res.json(movie);
};

const getMoviesByGenre = async (req, res) => {
  const genre = req.params.genre;
  const movie = await findMoviesByGenre(genre);
  return res.json(movie);
};

export { getMoviesByGenre, getMovieByTitle };
