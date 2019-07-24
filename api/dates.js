const express = require("express");
const router = new express.Router();
const Dates = require("../models/Dates");
const User = require("../models/User");
const getAll = () => Dates.find();
const getOne = id => Dates.findById(id);
const updateOne = (id, data) =>
  Dates.findOneAndUpdate({ _id: id }, data, {
    new: true,
    useFindAndModify: true
  });
const deleteOne = id => Dates.findByIdAndDelete(id);
const createOne = data => Dates.create(data);

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
  console.log("ici");
  console.log(req.body);

  createOne({ dates: req.body.dates })
    .then(result => {
      console.log(result._id);
      User.updateOne({ _id: req.body.userId }, { dates: result._id })
        .then(userupdated => {
          console.log(userupdated);
          res.status(200).send(result);
        })
        .catch(errooor => console.log(errooor));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something goes wrong");
    });
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send("Something goes wrong"));
});

router.patch("/:id", (req, res) => {
  console.log("la bas");
  console.log(req.params.id, req.body);
  updateOne(req.params.id, req.body)
    .then(result => {
      res.status(200).send(result);
    })
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
