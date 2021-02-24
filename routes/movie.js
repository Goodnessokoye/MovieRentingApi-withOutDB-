const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {Movie, validateMovie } = require("../models/movie")
const auth = require("../middlewares/auth")
const admin = require("../middlewares/admin")




//Get all movies
router.get("/", auth, async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

//Add a movie
router.post("/",[auth, admin], async (req, res) => {
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
router.delete("/:movieId", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.movieId);
  if (!movie) return res.status(404).send("The movieId is not found");
  res.send(movie);
});

//Update a movie
router.put("/:movieId", [auth,admin], async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.movieId, {
    name: req.body.name,
  });
  if (!movie)
    return res
      .status(404)
      .send("The movie with the given movieId is not found");
  res.send(movie);
});

module.exports = router;
