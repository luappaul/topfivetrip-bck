const express = require("express");
const router = new express.Router();
const Destinations = require("../models/Destinations");

const getAll = () => Destinations.find();
const getOne = id => Destinations.findById(id);
const updateOne = (id, data) => Destinations.findByIdAndUpdate(id, data);
const deleteOne = id => Destinations.findByIdAndDelete(id);
const createOne = data => Destinations.create(data);

router.get("/", (req, res) => {
  getAll()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.post("/", (req, res) => {
  console.log(req.body);
  createOne(req.body)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.patch("/:id", (req, res) => {
  updateOne()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

module.exports = {
  router,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne
};
