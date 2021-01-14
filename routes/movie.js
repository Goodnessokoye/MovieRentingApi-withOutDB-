const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Movie, validateMovie } = require("../models/movie")




//Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

//Add a movie
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let movie = new Movie({
    name: req.body.name,
    numberInStock: req.body.numberInStock,
    rentalFee: req.body.rentalFee,
  });
  movie = await movie.save();
  res.send(movie);
});

//Delete a movie
router.delete("/:movieId", async (req, res) => {
  const movie = await Movie.deleteOne(req.params._id);

  if (!movie) return res.status(404).send("The movieId is not found");
  res.send(movie);
});

//Update a movie
router.put("/:movieId", async (req, res) => {
  const movie = await Movie.updateOne(req.params._id, {
    name: req.body.name,
  });
  if (!movie)
    return res
      .status(404)
      .send("The movie with the given movieId is not found");
  res.send(movie);
});

module.exports = router;
