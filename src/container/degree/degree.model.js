const sequelize = require("sequelize");
const db = require("../../connections/sequelize");
var degree = db.define("degrees", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
  },
  name: {
    type: sequelize.STRING,
  },
  description: {
    type: sequelize.STRING,
  },
});
module.exports = degree;
