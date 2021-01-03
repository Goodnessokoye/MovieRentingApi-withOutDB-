const express = require("express");
const router = express.Router();
const Joi = require("joi");

//Movie Array
const movies = [
  {
    movieId: 1,
    name: "it is the end",
    numberInStock: 2,
    dailyRentalRate: 3,
    rentalFee: 100,
  },
  {
    movieId: 2,
    name: "End time",
    numberInStock: 1,
    dailyRentalRate: 3,
    rentalFee: 100,
  },
  {
    movieId: 3,
    name: "Hroutery holiday",
    numberInStock: 0,
    dailyRentalRate: 3,
    rentalFee: 100,
  },
];
//Rental array
const rentals = [];


//Get all movies
router.get("/", (req, res) => {
  res.send(movies);
});

//Add a movie
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

//Delete a movie
router.delete("/:movieId", (req, res) => {
  const movie = movies.find((c) => c.movieId === parseInt(req.params.movieId));
  if (!movie) return res.status(404).send("The movieId is not found");

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});
//Update a movie
router.put("/:movieId", (req, res) => {
  const movie = movies.find((c) => c.movieId === parseInt(req.params.movieId));
  if (!movie)
    return res
      .status(404)
      .send("The movie with the given movieId is not found");

  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  movie.name = req.body.name;
  res.send(movie);
});


//Rent
router.post("/rent", (req, res) => {
  const movie = movies.find((c) => c.movieId === parseInt(req.body.movieId));
  if (!movie)
    return res.status(404).send("The movie with the given Id is not found");

  const { error } = validateRental(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const rental = {
    id: rentals.length + 1,
    movieId: req.body.movieId,
    rentalFee: req.body.rentalFee,
    daliyRentalRate: req.body.daliyRentalRate,
  };
  rentals.push(rental);

  movie.numberInStock--;
  res.send(movie);
});

//Get all Rents
router.get("/rent", (req, res) => {
  res.send(rentals);
});

//Delete rent by Id
router.delete("/rent/:id", (req, res) => {
  const rental = rentals.find((c) => c.id === parseInt(req.params.id));
  if (!rental)
    return res.status(404).send("The rental with the given Id is not found");

  const index = rentals.indexOf(rental);
  rentals.splice(index, 1);
  res.send(rental);
});


//Rental validation
function validateRental(rental) {
  const schema = Joi.object({
    rentalFee: Joi.number().min(4).max(10000000000000000),
    daliyRentalRate: Joi.number().required(),
    rentalFee: Joi.number().required(),
        movieId: Joi.number().required(),
  });

  return schema.validate(rental);

};

//Movie validation
function validateMovie(movie) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    daliyRentalRate: Joi.number().required(),
    rentalFee: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  });

  return schema.validate(movie);
};
  module.exports = router;
