const express = require("express");
const router = new express.Router();
const cities = require("../models/Cities");

const getAll = () => cities.find();
const getOne = cityName => {
  //   const cityName = new RegExp(/par/, gi);
  console.log("ici");

  return cities.find({ City: { $regex: cityName, $options: "i" } });
};

router.get("/", (req, res) => {
  console.log("ici  ");
  getAll()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.get("/:city", (req, res) => {
  console.log("..........", req.params);
  const cityName = new RegExp(`\^${req.params.city}`);
  console.log("ici");
  getOne(cityName)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

module.exports = { router, getAll, getOne };
