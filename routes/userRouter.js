const express = require("express");
const User = require("../db/models/user");
const userRouter = express.Router();
const newError = require("../services/newError");
const authenticateToken = require("../middleware/authenticateToken");

userRouter.use(authenticateToken);

userRouter.get("/", async (req, res, next) => {
  try {
    let userList = await User.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(userList));
    res.end();
  } catch (err) {
    next(newError());
  }
});

userRouter.post("/", async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  try {
    let newUser = new User({ firstName, lastName, email });
    await newUser.save();
    res.status(201).send();
  } catch (err) {
    next(newError());
  }
});

userRouter.delete("/:emailId", async (req, res, next) => {
  try {
    let emailId = req.params.emailId;
    if (emailId == null) {
      next(newError("emailId is required", 400));
    }
    await User.destroy({ where: { email: emailId } });
    res.status(204).send();
  } catch (err) {
    next(newError());
  }
});

module.exports = userRouter;
