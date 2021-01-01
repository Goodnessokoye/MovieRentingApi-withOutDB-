const express = require("express");
const router = express.Router();
const Joi = require("joi");

const movies = [
  { id: 1, name: "it is the end", numberInStock: 2 },
  { id: 2, name: "End time", numberInStock: 1 },
  { id: 3, name: "Hroutery holiday", numberInStock: 0 },
];

router.get("/", (req, res) => {
  res.send(movies);
});

router.post("/api/movies", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const movie = {
    id: movies.length + 1,
    name: req.body.name,
    numberInStock: req.body.numberInStock,
  };
  movies.push(movie);
  res.send(movies);
});

router.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("The Id is not found");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

router.put("/:id", (req, res) => {
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given Id is not found");

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
