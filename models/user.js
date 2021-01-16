const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

//User validation
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;