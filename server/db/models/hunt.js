const Sequelize = require('sequelize')
const db = require('../db')

const Hunt = db.define('hunt', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Hunt
