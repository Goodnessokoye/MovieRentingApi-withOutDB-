const express = require("express");
const router = express.Router();
const Joi = require("joi");

const movies = [
  { 
    movieId: 1, 
    name: "it is the end", 
    numberInStock: 2, 
    dailyRentalRate: 3 },
  { 
    movieId: 2, 
    name: "End time", 
    numberInStock: 1, 
    dailyRentalRate: 3 },
  {
    movieId: 3,
    name: "Hroutery holiday",
    numberInStock: 0,
    dailyRentalRate: 3,
  },
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.post("/", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const movie = {
    movieId: movies.length + 1,
    name: req.body.name,
    numberInStock: req.body.numberInStock,
  };
  movies.push(movie);
  res.send(movies);
});

router.delete("/:id", (req, res) => {
  const movie = movies.find((c) => c.movieId === parseInt(req.params.movieId));
  if (!movie) return res.status(404).send("The movieId is not found");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

router.put("/:movieId", (req, res) => {
  const movie = movies.find((c) => c.movieId === parseInt(req.params.movieId));
  if (!movie)
    return res.status(404).send("The movie with the given movieId is not found");

  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  movie.name = req.body.name;
  res.send(movie);
});

function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
  });

  return schema.validate(movie);
}

module.exports = router; 
