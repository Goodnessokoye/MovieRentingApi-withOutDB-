const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const {User, validate} = require("../models/user");
const bcrypt = require('bcrypt');
var _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config")

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

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();
  res.send(_.pick(user, ["name", "email"]));
 
});

//SignIn
router.post("/login", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(401).send(error.details[0].message);


  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid Email Password ");

  const checkPassword = await bcrypt.compare(req.body.password, user.password)
  if(!checkPassword) return res.status(400).send(" Invalid Email or Password ")

    const token = jwt.sign({_id: user._id}, config.get("jwtPrivateKey"))
    res.send(token);

});


module.exports = router;