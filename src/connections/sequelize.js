require("dotenv").config();
var sequelize = require("sequelize");
var db = new sequelize(
    'apmdev',
    'admin',
    'admin1234',
    {
        dialect: "mysql",
        host: 'apmdev.cpcuymowiolk.ap-south-1.rds.amazonaws.com',
    }
);
module.exports = db;