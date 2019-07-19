const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

const create = data => userModel.create(data);

const getAll = () => userModel.find();

const getBy = (key, val) => userModel.findOne({ [key]: val });

const getOne = id => userModel.findById(id);

const deleteOne = id => userModel.findOneAndDelete(id);

const updateOne = (id, catName) =>
  userModel.findOneAndUpdate({ _id: id }, { name: catName });

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
  getOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(dbErr => res.send(dbErr));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id, req.params.name)
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.send(dbErr));
});

router.patch("/:id", (req, res) => {
  updateOne(req.params.id, req.body.name)
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
