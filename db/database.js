var { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sample", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
