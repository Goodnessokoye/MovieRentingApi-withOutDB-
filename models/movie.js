const express = require("express");
const mongoose = require("mongoose");
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
)

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


exports.Movie = Movie;
exports.validateMovie = validateMovie;