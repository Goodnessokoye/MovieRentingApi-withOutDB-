const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const {User, validate} = require("../models/user");

/* Built a simple Login without Bcrypt and jwt */

//Get all user
router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

//Get user by userId
router.get("/:userId", async (req, res) => {
  const user = await User.findOne(req.params._id);
  if (!user) return res.send("User with the given userId does not exist");
  res.send(user);
});

//Sign up
router.post("/register", async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.send("User with this email address already exist!");

  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();
  res.send(user);
});

//SignIn
router.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user)
    return res.status(404).send("The user with the email does not exist!");
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  (user.email = req.body.email),
    (user.password = req.body.password),
    res.send("Login Successful");
});


module.exports = router;