const express = require("express");
const router = new express.Router();
const cities = require("../models/Cities");

const getAll = () => cities.find();
const getOne = cityName => {
  return cities.find({ City: { $regex: cityName, $options: "i" } });
};

router.get("/", (req, res) => {
  getAll()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.get("/:city", (req, res) => {
  const cityName = new RegExp(`\^${req.params.city}`);
  getOne(cityName)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

module.exports = { router, getAll, getOne };
