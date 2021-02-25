const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

//Rental model
const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
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
//Rental validation
function validateRental(rental) {
  const schema = Joi.object({
    rentalFee: Joi.number().min(4).max(255),
    daliyRentalRate: Joi.number().required(),
    id: Joi.string().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
