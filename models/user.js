const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

//User validation
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20),
    email: Joi.string(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
    isActive:Joi.boolean()
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validate;
