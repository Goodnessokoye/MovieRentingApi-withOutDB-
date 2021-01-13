const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

//Movie model
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    numberInStock: {
      type: Number,
      required: true,
    },
    dailyRentalRate: {
      type: Number,
      required: false,
    },
    rentalFee: {
      type: Number,
      required: true,
    },
  })
);

//Rental model
const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    // name: {
    //   type: String,
    //   required: true,
    //   minlength: 5,
    //   maxlength: 255,
    // },
    rentalFee: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 255,
    },
    daliyRentalRate: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 255,
    },
  })
);

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

//Rent
router.post("/rent", async (req, res) => {
  const movie = await Movie.findOne(req.body._id);
  if (!movie)
    return res.status(404).send("The movie with the given Id is not found");
  if (movie.numberInStock === 0)
    return res.status(401).send("The movie you want to rent is unavaliable");

  const { error } = validateRental(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let rental = new Rental({
    id: req.body.id,
    rentalFee: req.body.rentalFee,
    daliyRentalRate: req.body.daliyRentalRate,
  });

  rental = await rental.save();
  Movie.numberInStock--;
  res.send(rental);
});

//Get all Rents
router.get("/rent", async (req, res) => {
  const rental = await Rental.find().sort("name");
  res.send(rental);
});

//Delete rent by Id
router.delete("/rent/:id", async (req, res) => {
  const rental = await Rental.deleteOne(req.params._id);
  if (!rental)
    return res.status(404).send("The rental with the given Id is not found");
  res.send(rental);
});

//Rental validation
function validateRental(rental) {
  const schema = Joi.object({
    rentalFee: Joi.number().min(4).max(255),
    daliyRentalRate: Joi.number().required(),
    id: Joi.string().required(),
  });

  return schema.validate(rental);
}

//Movie validation
function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    daliyRentalRate: Joi.number(),
    rentalFee: Joi.number().required(),
    numberInStock: Joi.number(),
  });

  return schema.validate(movie);
}
module.exports = router;
