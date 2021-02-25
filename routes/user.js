const bcrypt = require("bcrypt");
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

//Get all user
router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

//Get all active user
router.get("/active", auth, async (req, res) => {
  const users = await User.find({ isActive: true }).sort("name");
  if (!users) return res.status(404).send("No user with an active account");
  // res.send(_.pick(users, ["name", "email", "isActive"]))
  res.send(users);
});


//Get user by userId
router.get("/:id", [auth, admin], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.send("User with the given userId does not exist");
  res.send(user);
});



//Delete or inActive users
router.put("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!user) return res.status(404).send("The user with the id is not found");
  res.send(_.pick(user, ["name", "email", "isActive"]));
});

//Sign up
router.post("/register", async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.send("User with this email address already exist!");

  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

//SignIn
router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email Password ");

  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword)
    return res.status(400).send(" Invalid Email or Password ");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send("Logged in");
});

module.exports = router;
