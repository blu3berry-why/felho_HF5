// Import express:
import express, { NextFunction, Request, Response } from "express";
import { NotFound, BadRequest } from "http-errors";
import { Movie } from "../schemas/movie_schemas";
import { IMovieId } from "../interfaces/movie_interfaces";

// Create a new express router:
const router = express.Router();

const movie_filter_id = {
  _id: 0,
  id: 0,
  title: 1,
  year: 1,
  director: 1,
  actor: 1,
};

router.get("/movies", async (req, res, next) => {
  const movies = await Movie.find(
    {},
    { _id: 0, id: 0, title: 1, year: 1, director: 1, actor: 1 }
  );
  res.send(movies);
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.find(
      { id: Number(req.params.id) },
      movie_filter_id
    );
    if (movie == null) {
      return res.send(NotFound);
    }
    res.send(movie);
  } catch {
    res.send(BadRequest());
  }
});

router.post("/movies", async (req, res, next) => {
  let movie = {
    id: Math.floor(Math.random() * 100000000),
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    actor: req.body.actor,
  };

  const savedMovie = await Movie.create(movie);
  const movieId: IMovieId = {
    id: movie.id,
  };

  res.send(movieId);
});

router.post("/movies/:id", async (req, res, next) => {
  let id = req.params.id;

  const dbMovie = await Movie.findOne({ id: id }, movie_filter_id);

  if (dbMovie == null) {
    let movie = {
      id: Math.floor(Math.random() * 100000000),
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      actor: req.body.actor,
    };
    Movie.create(movie);
    return res.send().status(201);
  } else {
    dbMovie.title = req.body.title,
    dbMovie.year = req.body.year,
    dbMovie.director = dbMovie.director,
    dbMovie.actor = dbMovie.actor;

    dbMovie.save();
  }
  return res.send().status(200);
});

router.delete("/movies/:id", async (req, res, next) => {
  await Movie.deleteOne(
    {id: req.params.id}
  );
  res.send().status(204);
});

router.get("/movies/find/", async (req, res, next) => {
  const movies = await Movie.find(
    {year: req.query.year},
    { _id: 0, id: 1, title: 0, year: 0, director: 0, actor: 0 }
  ).sort(String(req.query.orderby)) ?? [];
  res.send(movies);
});

// Export the router:
export default router;
