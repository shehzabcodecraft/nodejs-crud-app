const app = require("./server");
require("dotenv").config();
const sequelize = require("./db/database");
const userTable = require("./db/models/user");
const authTable = require("./db/models/auth");

const PORT = process.env.PORT;

const run = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection successful...");
    })
    .catch((err) => {
      console.log("Databse connection failed " + err);
      throw err;
    });

  await sequelize.sync();

  var server = app.listen(PORT, () => {
    console.log(`server running port is ${PORT}`);
  });
};

run();
