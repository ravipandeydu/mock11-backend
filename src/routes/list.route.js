const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");

const { ListModel } = require("../models/List.model");

const listRoutes = Router();

listRoutes.get("/", authentication, async (req, res) => {
  const emi = await ListModel.find();
  res.send(emi);
});

listRoutes.post("/create", authentication, async (req, res) => {
  const newList = new ListModel(req.body);
  try {
    await newList.save();
    res.send(newList);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

listRoutes.delete("/delete/:listId", authentication, async (req, res) => {
  const { listId } = req.params;
  const deletedList = await ListModel.findOneAndDelete({
    _id: listId,
  });
  if (deletedList) {
    res.status(200).send("Deleted");
  } else {
    res.send("couldn't delete");
    console.log(err);
  }
});

listRoutes.patch("/edit/:listId", authentication, async (req, res) => {
  const { listId } = req.params;
  const updatedList = await ListModel.findOneAndUpdate(
    { _id: listId },
    req.body
  );
  if (updatedList) {
    res.send(updatedList);
  } else {
    res.send("couldn't update");
  }
});

module.exports = {
  listRoutes,
};
