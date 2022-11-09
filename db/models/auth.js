var { Sequelize, Model, DataTypes } = require("sequelize");
var sequelize = require("../database");

class Auth extends Model {}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Auth",
  }
);

module.exports = Auth;
