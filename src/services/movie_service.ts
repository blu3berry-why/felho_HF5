// Import express:
import express, { NextFunction, Request, Response } from "express";
import { NotFound, BadRequest } from "http-errors";
import { Movie } from "../schemas/movie_schemas";
import { IMovieId } from "../interfaces/movie_interfaces";

// Create a new express router:
const router = express.Router();

let id = 1;

const movie_filter_id = {
  _id: 0,
  id: 0,
  __v: 0,
};

router.get("/movies", async (req, res, next) => {
  const movies = await Movie.find({}, { _id: 0, id: 0, __v: 0 });
  res.send({ movie: movies });
});

router.get("/movies/find", async (req, res, next) => {
  console.log(`called, year=${req.query.year}, orderby=${req.query.orderby}`);
 
  const movies =
    (await Movie.find({ year: req.query.year }).sort(
      String(req.query.orderby).toLowerCase()
    )) ?? [];

  console.log(movies);
  let mId: number[] = [];
  movies.forEach((i) => mId.push(i.id));

  res.send({ id: mId });
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findOne(
      { id: Number(req.params.id) },
      movie_filter_id
    );
    if (movie == null) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch {
    return res.status(400).send();
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

router.put("/movies/:id", async (req, res, next) => {
  let id = req.params.id;

  const dbMovie = await Movie.findOne({ id: id });

  if (dbMovie == null) {
    let movie = {
      id: id,
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      actor: req.body.actor,
    };
    Movie.create(movie);
    return res.send().status(201);
  } else {
    (dbMovie.title = req.body.title),
      (dbMovie.year = req.body.year),
      (dbMovie.director = req.body.director),
      (dbMovie.actor = req.body.actor);

    dbMovie.save();
  }
  return res.send().status(200);
});

router.delete("/movies/:id", async (req, res, next) => {
  await Movie.deleteOne({ id: req.params.id });
  res.send().status(204);
});



// Export the router:
export default router;
