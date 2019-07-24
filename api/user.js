const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

const create = data => userModel.create(data);

const getAll = () => userModel.find();

const getBy = (key, val) => userModel.findOne({ [key]: val });

const getOne = id => userModel.findById(id);

const deleteOne = id => userModel.findOneAndDelete(id);

const updateOne = (id, data) =>
  userModel.findOneAndUpdate({ _id: id }, { $set: { location: data } });

router.post("/", (req, res) => {
  create(req.body)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  getOne(req.params.id)
    .populate("dates")
    .populate("destinations")
    .then(user => res.status(200).json(user))
    .catch(dbErr => res.send(dbErr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id, req.params.name)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.patch("/:id", (req, res) => {
  console.log(req.body.location);
  updateOne(req.params.id, req.body.location)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

module.exports = {
  create,
  deleteOne,
  getAll,
  getOne,
  getBy,
  updateOne,
  router
};
