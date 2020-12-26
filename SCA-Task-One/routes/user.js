const express = require("express");
const router = express.Router();

const users = [
  {
    id: 1,
    name: "Goodness",
    email: "goodnessokoye@gmail.com",
    password: 00000,
  },
];

router.get("/api/user", (req, res) => {
  console.log("....")
  res.send(users);
});

router.get("/api/user/:id", (req, res) => {
  const user = users.find((c) => c.id === parseInt(req.param.id));
  if (!user) return res.send("User with the given id does not exist");
  console.log(user);
  res.send(user);
});

router.post("/api/user/register", (req, res) => {
  const user = users.find((c) => c.id === req.body.email);
  if (user) return res.send("User with this email address already exist!");

  (user.id = users.length + 1),
    (user.name = req.body.name),
    (user.email = req.body.email),
    (user.password = req.body.password),
    users.push(user);
  res.send(users);
});

router.post("/api/user/login", (req, res) => {
  const user = users.find((c) => c.email === req.body.email);
  if (!user)
    return res.status(404).send("The user with the email does not exist!");
  console.log("...");

  (user.email = req.body.email),
    (user.password = req.body.password),
    res.send("Login Successful");
});

module.exports = router;
