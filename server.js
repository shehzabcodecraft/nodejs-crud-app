const express = require("express");
const router = express.Router();
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

app.use(express.json());

router.get("/ping", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "pong" }));
  res.end();
});

router.use("/user", userRouter);
router.use("/auth", authRouter);

app.use("/api/v1", router);

module.exports = app;
