const express = require("express");
const rental = require("./routes/rental.js");
const movie = require("./routes/movie.js");
const user = require("./routes/user.js");
const app = require("express")();

app.use(express.json());

app.use("/api/user", user);
app.use("/api/movie", movie);
app.use("/api/rentals", rental);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
