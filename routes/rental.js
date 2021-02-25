const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Rental, validateRental } = require("../models/rental");
const { Movie, validateMovie } = require("../models/movie");
const auth = require("../middlewares/auth");

//Rent
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("name");
  res.send(rental);
});

//Delete rent by Id
router.delete("/:id", auth, async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with the given Id is not found");
  res.send(rental);
});

module.exports = router;
