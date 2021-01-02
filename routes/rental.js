const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {movies} = require("./movie.js");
const user = require("./user.js");

const rentals = [
  {
    id: 1,
    title: " end it",
    movieId: 7,
    userId: 7,
    daliyRentalRate: 4,
    rentalFee: 100,
  },
];

router.get("/", (req, res) => {
  res.send(rentals);
});

router.post("/", (req, res) => {
const movie= movies.find(c=>c.movieId === parseInt( req.body.movieId));
if(!movie) return res.status(404).send("The movie with the given Id is not found");


  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const rental = {
    id: rentals.length + 1,
    title: req.body.title,
    movieId: req.body.movieId,
    userId: req.body.userId,
    rentalFee: req.body.rentalFee,
    daliyRentalRate: req.body.daliyRentalRate,
  };
  rentals.push(rental);

  movie.numberInStock--;
  res.send(rentals);
});

router.delete("/api/rentals/:id", (req, res) => {
  const rental = rentals.find((c) => c.id === parseInt(req.params.id));
  if (!rental)
    return res.status(404).send("The rental with the given Id is not found");

  const index = rentals.indexOf(rental);
  rentals.splice(index, 1);
  res.send(rental);
});

router.put("/api/rentals/:id", (req, res) => {
  const rental = rentals.find((c) => c.id === parseInt(req.params.id));
  if (!rental)
    return res.status(404).send("The rental with the given Id is not found");

  const { error } = validateMovie(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  rental.title = req.body.title;
  res.send(rental);
});

function validateMovie(rental) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(20),
    rentalFee: Joi.number().min(4).max(10000000000000000),
  });

  return schema.validate(rental);
}

module.exports = router;
