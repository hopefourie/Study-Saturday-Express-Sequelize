const { Sequelize } = require("sequelize");

const db = new Sequelize('postgres://localhost/studySaturday', {
  logging: false
});

module.exports = db
