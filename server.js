const mongoose = require("mongoose");
const express = require("express");
const movie = require("./routes/movie.js");
const user = require("./routes/user.js");
const app = require("express")();

app.use(express.json());

app.use("/api/user", user);
app.use("/api/movie", movie);

mongoose
  .connect("mongodb://localhost/MovieRent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
