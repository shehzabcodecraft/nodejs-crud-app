const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Auth = require("../db/models/auth");
const jwt = require("jsonwebtoken");
const newError = require("../services/newError");

router.post("/signup", async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let username = await Auth.findOne({
      where: {
        userName: userName,
      },
    });
    if (username) {
      next(newError("Username already exist", 400));
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      let auth = new Auth({ userName, password: hashPassword });
      auth = await auth.save();
      res.status(201).send();
    }
  } catch (err) {
    next(newError());
  }
});

router.post("/signin", async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    let auth = await Auth.findOne({
      where: {
        userName: userName,
      },
    });
    if (auth != null) {
      let valid = await bcrypt.compare(password, auth.password);
      if (valid) {
        let jwtToken = jwt.sign(auth.userName, process.env.ACCESS_TOKEN_SECRET);
        res.contentType("application/json");
        res.write(JSON.stringify({ token: jwtToken }));
        res.status(200).send();
      } else {
        next(newError("Incorrect password", 400));
      }
    } else {
      next(newError("User not found", 400));
    }
  } catch (err) {
    next(newError());
  }
});

module.exports = router;
