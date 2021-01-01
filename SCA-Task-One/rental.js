// const express = require("express");
// const router = express.Router;
// const Joi = require("joi");
// router.use(express.json());

// const rentals = [
//   {
//     id: 1,
//     title: " end it",
//     movieId: 1,
//     userId: 1,
//     daliyRentalRate: 4,
//     rentalFee: N100,
//   },
// ];

// router.get("/api/rentals", (req, res) => {
//   res.send(rentals);
// });

// router.post("/api/rentals", (req, res) => {
//   const { error } = validateMovie(req.body);
//   if (error) return res.status(401).send(error.details[0].message);

//   const movie = {
//     id: rentals.length + 1,
//     title: req.body.title,
//     movieId: req.body.movieId,
//     userId: req.body.userId,
//     rentalFee: req.body.rentalFee,
//     daliyRentalRate: req.body.daliyRentalRate,
//   };
//   rentals.push(rental);

//   movie.numberInStock--;
//   movie.save();
//   res.send(rentals);
// });

// router.delete("/api/rentals/:id", (req, res) => {
//   const rental = rentals.find((c) => c.id === parseInt(req.params.id));
//   if (!rental)
//     return res.status(404).send("The rental with the given Id is not found");

//   const index = rentals.indexOf(rental);
//   rentals.splice(index, 1);
//   res.send(rental);
// });

// router.put("/api/rentals/:id", (req, res) => {
//   const rental = rentals.find((c) => c.id === parseInt(req.params.id));
//   if (!rental)
//     return res.status(404).send("The rental with the given Id is not found");

//   const { error } = validateMovie(req.body);
//   if (error) return res.status(401).send(error.details[0].message);

//   rental.name = req.body.name;
//   res.send(rental);
// });

// function validateMovie(rental) {
//   const schema = {
//     name: Joi.string().min(5).max(20).required(),
//   };

//   return Joi.validate(schema, rental);
// }

// module.exports = router;
