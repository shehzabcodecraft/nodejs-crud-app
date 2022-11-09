const app = require("./server");
require("dotenv").config();
const sequelize = require("./db/database");
const userTable = require("./db/models/user");
const authTable = require("./db/models/auth");

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

  await sequelize.sync({ force: true });

  var server = app.listen(8081, () => {
    var port = server.address().port;
    var address = server.address().address;

    console.log(`server running at http://${address}:${port}`);
  });
};

run();
