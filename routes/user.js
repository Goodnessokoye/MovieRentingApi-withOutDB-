const express = require("express");
const router = require("express").Router();



/* Built a simple Login without Bcrypt and jwt */

const users = [
  {
    userId: 1,
    name: "Goodness",
    email: "goodnessokoye@gmail.com",
    password: 00000,
  },
];

//Get all user
router.get("/", (req, res) => {
  res.send(users);
});

//Get user by Id
router.get("/:userId", (req, res) => {
  const user = users.find((c) => c.userId === parseInt(req.param.userId));
  if (!user) return res.send("User with the given userId does not exist");
  console.log(user);
  res.send(user);
});

//Sign up
router.post("/register", (req, res) => {
  const user = users.find((c) => c.userId === req.body.email);
  if (user) return res.send("User with this email address already exist!");

  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  (user.userId = users.length + 1),
    (user.name = req.body.name),
    (user.email = req.body.email),
    (user.password = req.body.password),
    users.push(user);
  res.send(users);
});

//SignIn
router.post("/login", (req, res) => {
  const user = users.find((c) => c.email === req.body.email);
  if (!user)
    return res.status(404).send("The user with the email does not exist!");
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  (user.email = req.body.email),
    (user.password = req.body.password),
    res.send("Login Successful");
});

//User validation
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(user);
}

module.exports = router;
