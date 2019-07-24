const express = require("express");
const router = new express.Router();
const Destinations = require("../models/Destinations");
const User = require("../models/User");
const getAll = () => Destinations.find();
const getOne = id => Destinations.findById(id);
const updateOne = (id, data) =>
  Destinations.updateOne({ _id: id }, { $push: { destinations: data } });
const deleteOne = (id, data) =>
  Destinations.findByIdAndUpdate(id, data, { new: true });
const createOne = data => Destinations.create({ destinations: data });

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
  createOne(req.body.destinations)
    .then(result => {
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { destinations: result._id },
        { upsert: true }
      )
        .then(updatedUser => {
          res.status(200).send(updatedUser);
        })
        .catch(error => console.log(error));
    })
    .catch(err => {
      err.status(500).send("Something goes wrong");
    });
});

router.patch("/deleteDestination/:id", (req, res) => {
  deleteOne(req.params.id, req.body)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send("Something goes wrong");
    });
});

router.patch("/updateDestination/:id", (req, res) => {
  updateOne(req.params.id, req.body.destinations)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      err.status(500).send("Something goes wrong");
    });
});

module.exports = {
  router,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne
};
