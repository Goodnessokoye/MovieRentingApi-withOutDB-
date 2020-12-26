const express = require("express");
const movie = require("./routes/movie.js");
const user = require("./routes/user.js");
const app = express();

app.use(express.json());

app.use("/api/user", user);
app.use("/api/movie", movie);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));


